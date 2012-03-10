mongoose = require 'mongoose'
Person = mongoose.model 'Person'

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
      res.redirect "/people/#{person.id}"

app.get '/people/:id', (req, res, next) ->
  person = Person.findById req.params.id
  console.log person.id
  res.render 'people/show', 
    person: person
    title: 'Show Person'

app.get '/people/:id/edit', (req, res, next) ->
  person = Person.findById req.params.id
  res.render 'people/edit', 
    person: person
    title: 'Edit Person'
