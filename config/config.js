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
      app.set('db-uri', 'mongodb://localhost/hello-node-production');
    }    

    // cache-control for static assets
    var oneYear = 31557600000;
    app.use(express.static(o.paths.root, { maxAge: oneYear }));
  });
  
  // all environments
  // order matters: these come last because loggers needs to be first  
  app.configure(function(){
  	app.set('view engine','jade');
    app.register('.html', o.expressHogan);
    app.set('views', o.paths.views);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    //app.use(express.compiler({ src: o.paths.root, enable: ['less'] }));
    app.use(app.router);
  });
    
  global.db = mongoose.connect(app.set('db-uri'));  
};