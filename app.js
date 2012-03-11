var Server = {},
    express = require("express"),
    coffeeScript = require("coffee-script"),
    path = require("path"),
    application_root = __dirname;

_ = module.exports = require('underscore');

global.Server = Server;
Server.root = application_root;
global.app = express.createServer();

// Config
Server.setup = require("./config/config.js").setup({
  app: app, 
  mongoose : require("mongoose"),
  express : express,
  expressHogan : require("express-hogan.js"),
  jade : require("jade"),
  paths : {
    views :  path.join(application_root,"app","views"),
    root : path.join(application_root,"public"),
    controllers : path.join(application_root,"app","controllers"),
    models : path.join(application_root,"app","models")
  }
});

// Models
fs = require("fs");
fs.readdirSync("app/models").forEach(function(file) {
    require("./app/models/" + file);
});

// Controllers
fs.readdirSync("app/controllers").forEach(function(file) {
    require("./app/controllers/" + file);
});

// Misc routes
require("./routes");  

// Start server
app.listen(Server.port || process.env.PORT); //heroku
//app.listen(Server.port || 3000); //EC2
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
