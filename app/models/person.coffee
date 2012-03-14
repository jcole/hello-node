mongoose = require "mongoose"
lastMod = require '../../lib/lastMod'

required = (val) ->
  val && val.length

PersonSchema = new mongoose.Schema
  firstName: {type: String, trim: true, validate: [required, 'Needs first name']}
  lastName: {type: String, trim: true}
  createdAt: {type: Date, default: Date.now}
  
PersonSchema.method 'name', ->
  "#{@firstName} #{@lastName}"

PersonSchema.plugin lastMod

mongoose.model 'Person', PersonSchema
  
