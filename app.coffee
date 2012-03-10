# Module dependencies
express = require("express")
jade = require("jade")
mongoose = require("mongoose")
expressHogan = require("express-hogan.js")
coffeeScript = require("coffee-script")

app = module.exports = express.createServer()

# Configuration
conf = require("./config/config")
conf(app, express, expressHogan)
settings = conf.settings

app.get "/", (req, res) ->
  res.send 'Hello World!'

# Start server
port = process.env.PORT || 3000
app.listen port
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
console.log "Using Express %s, Jade %s, Mongoose %s", express.version, jade.version, mongoose.version