mongoose = require("mongoose")

personSchema = new mongoose.Schema
  firstName: String
  lastName: String

personSchema.method 'name', ->
  "#{@firstName} #{@lastName}"

mongoose.model 'Person', personSchema
  
