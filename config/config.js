module.exports = function(app, express, expressHogan) {
  // order matters: enviornment-specific configs come first
  // because logger needs to be first
  
  // -- DEVELOPMENT
  app.configure('development', function() {
    require("./development")(app, express);
  });

  // -- TEST
  app.configure('test', function() {
    require("./test")(app, express);
  });

  // -- PRODUCTION
  app.configure('production', function() {
    require("./production")(app, express);
  });
  
  app.configure(function(){
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');
    app.register('.html', expressHogan);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/../public'));
  });  
};

// -- Global settings
var settings = {
  'siteName' : 'yoursitename',
  'sessionSecret' : 'sessionSecret',
  'uri' : 'http://localhost', // Without trailing /
  'port' : process.env.PORT || 3000,
  'debug' : 0,
  'profile' : 0,
  'mongo_url' : 'mongodb://localhost/hello-node'
};

module.exports.settings = settings;