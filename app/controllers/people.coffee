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
  Person.findById req.params.id, 
    (err, foundPerson) ->  
      res.render 'people/show', 
        person: foundPerson
        title: 'Show Person'

app.get '/people/:id/edit', (req, res, next) ->
  Person.findById req.params.id, 
    (err, foundPerson) ->  
      console.log 'HERE'
      res.render 'people/edit', 
        person: foundPerson
        title: 'Edit Person'
        
# update
app.put '/people/:id', (req, res) ->
  Person.findById req.params.id, 
    (err, foundPerson) ->  
      _.extend foundPerson, req.body
      foundPerson.save (err) ->
        return next err if err && err.name != 'ValidationError'
        if foundPerson.errors
          res.render '/people/edit', person: foundPerson
        else
          res.redirect "/people/#{foundPerson.id}"

# delete
app.delete '/people/:id', (req, res, next) ->
  Person.findById req.params.id, 
    (err, foundPerson) ->      
      foundPerson.remove (err) ->
        return next err if err
        res.redirect '/people'
