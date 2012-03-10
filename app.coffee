# Module dependencies
express = require("express")
jade = require("jade")
mongoose = require("mongoose")
expressHogan = require("express-hogan.js")

# init express app server
app = module.exports = express.createServer()

# Configuration
config = require("./config")
config(app, express, expressHogan)

# set db
db = mongoose.connect(app.set('db-uri'))
Schema = db.Schema

PersonSchema = new Schema
  firstName: String
  lastName: String

PersonSchema.method 'name', ->     
    "#{@firstName} #{@lastName}"
  
Person = db.model 'Person', PersonSchema

ProjectSchema = new Schema
  title: String

Project = db.model 'Project', ProjectSchema

# Routes
app.get "/", (req, res) ->
  res.render "index",
    title: "Express"

app.get "/hogan",  (req, res) ->
  res.render "hogan.html",
    locals:
      title: "Express test"
      message: "using Hogan templating system"

app.get '/people', (req, res, next) ->
  Person.find {firstName: {$ne: null}}, {}, (err, people) ->
    return next err if err
    res.render 'people/index', 
      people: people
      title: 'People!'

app.get '/people/new', (req, res, next) ->
  res.render 'people/new', 
    person: new Person
    title: 'New Person'

app.post '/people', (req, res) ->
  person = new Person req.body
  person.save (err) ->
    if err
      res.render 'people', 
        person: person
        title: 'New Person'
    else
      res.redirect "people/#{person}"

app.get '/people/:id', (req, res, next) ->
  person = Person.findById req.params.id
  res.render 'people/edit', 
    person: person
    title: 'Show Person'

app.get '/people/:id/edit', (req, res, next) ->
  person = Person.findById req.params.id
  res.render 'people/edit', 
    person: person
    title: 'Edit Person'

# Start server
port = process.env.PORT || 3000
app.listen port
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
console.log "Using Express %s, Jade %s, Mongoose %s", express.version, jade.version, mongoose.version