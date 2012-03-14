// Start me with "nodemon app.js"

var express = require("express"),
    mongoose = require("mongoose"),
    hulk_hogan = require("hulk-hogan"),
    coffeeScript = require("coffee-script"),
    path = require("path"),
    fs = require("fs");

_ = module.exports = require('underscore');

global.app = express.createServer();

// Config

var application_root = __dirname,
    path_lib = path.join(application_root,"lib"),
    path_routes = path.join(application_root,"app","routes.js"),
    path_views =  path.join(application_root,"app","views"),
    path_root = path.join(application_root,"public"),
    path_controllers = path.join(application_root,"app","controllers"),
    path_models = path.join(application_root,"app","models");

// defaults
app.set('port', 3000);
app.use(express.static(path_root)); 

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
  app.use(express.errorHandler());
});

// production
app.configure('production', function() {
  if ('heroku' == process.env.DEPLOY) {
    //Heroku
    app.set('port', process.env.PORT);
    app.set('db-uri', process.env.MONGOHQ_URL);
  } else {
    // EC2
    app.set('port', 3000);
    app.set('db-uri', ' mongodb://jcadmin:0chdyZMGqprxk6v@staff.mongohq.com:10081/hello-node-ec2'); //mongoGQ
    //app.set('db-uri', 'mongodb://localhost/hello-node-production'); //old local URL
  }    

  // cache-control for static assets
  app.use(express.static(path_root, { maxAge: 31557600000 }));  // max-age: 1 year
});

// all environments  (environment order matters: "all" comes last because loggers needs to be first)
app.configure(function(){
  app.set('views', path_views);
  app.set('view engine','html');
  app.register('.html', hulk_hogan);
  
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
     
mongoose.connect(app.set('db-uri'));

// Todo: auto-include libs?
// fs.readdirSync(path_lib).forEach(function(file) {
//   require(path_lib + "/" + file);
// });

// Models
fs.readdirSync(path_models).forEach(function(file) {
  require(path_models + "/" + file);
});

// Controllers
fs.readdirSync(path_controllers).forEach(function(file) {
  require(path_controllers + "/" + file);
});

// Misc routes
require(path_routes);  

// Start server
app.listen(app.set('port'));
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
