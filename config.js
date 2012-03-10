module.exports = function(app, express, expressHogan) {
  
  // development
  app.configure('development', function() {
    app.set('db-uri', 'mongodb://localhost/hello-node');
    app.use(express.logger({ format: 'dev' }));
    app.set('view options', { pretty: true });
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    
  });

  // test
  app.configure('test', function() {
    app.set('db-uri', 'mongodb://localhost/hello-node-test');
    app.use(express.profiler());
    //app.set('view options', { layout: 'layouts/default' });
    app.use(express.errorHandler());
  });

  // production
  app.configure('production', function() {
    app.set('db-uri', 'mongodb://localhost/hello-node-production');
    //app.set('view options', { layout: 'layouts/default' });
  });
  
  // all environments
  // order matters: these come last because loggers needs to be first
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.register('.html', expressHogan);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });  
};