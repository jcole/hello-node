module.exports.setup = function(o){
  var app = o.app,
      mongoose = o.mongoose,
      express = o.express;
  
  Server.paths = o.paths;

  // development
  app.configure('development', function() {
    app.set('db-uri', 'mongodb://localhost/hello-node');
    app.use(express.logger({ format: 'dev' }));
    app.set('view options', { pretty: true });
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(o.paths.root));    
  });

  // test
  app.configure('test', function() {
    app.set('db-uri', 'mongodb://localhost/hello-node-test');
    app.use(express.profiler());
    app.use(express.errorHandler());
    app.use(express.static(o.paths.root));
  });

  // production
  app.configure('production', function() {
    if ('heroku' == process.env.DEPLOY) {
      //Heroku
      Server.port = process.env.PORT;
      app.set('db-uri', process.env.MONGOHQ_URL);
    } else {
      // EC2
      Server.port = 3000;
      app.set('db-uri', ' mongodb://jcadmin:0chdyZMGqprxk6v@staff.mongohq.com:10081/hello-node-ec2'); //mongoGQ
      //app.set('db-uri', 'mongodb://localhost/hello-node-production'); //local
    }    

    // cache-control for static assets
    var oneYear = 31557600000;
    app.use(express.static(o.paths.root, { maxAge: oneYear }));        
  });
  
  // all environments
  // order matters: these come last because loggers needs to be first  
  app.configure(function(){
    app.set('views', o.paths.views);
    app.set('view engine','html');
    app.register('.html', o.hulk);
    
    // -- Parses x-www-form-urlencoded request bodies (and json)
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // -- Cookie support
    app.use(express.cookieParser());

    // -- CRSF protection middleware
    //app.use(express.csrf());

    // -- Express routing
    app.use(app.router);    
  });
  
  // TODO: figure out error pages

  //handle errors in production only
  // if ('production' == process.env.NODE_ENV) {
  //   // error handling
  //   app.use(function(req, res, next){
  //     // respond with html page
  //     if (req.accepts('html')) {
  //       res.status(404);
  //       res.render('404', { url: req.url, title: 'Page not found' });
  //       return;
  //     }
  // 
  //     // respond with json
  //     if (req.accepts('json')) {
  //       res.send({ error: 'Not found' });
  //       return;
  //     }
  // 
  //     // default to plain-text. send()
  //     res.type('txt').send('Not found');
  //   });
  //   
  //   // show this 500 page in production
  //   app.use(function(err, req, res, next){
  //     // we may use properties of the error object
  //     // here and next(err) appropriately, or if
  //     // we possibly recovered from the error, simply next().
  //     res.status(err.status || 500);
  //     res.render('500', { error: err, title: 'Error' });
  //   });
  // }
       
  global.db = mongoose.connect(app.set('db-uri'));  
};