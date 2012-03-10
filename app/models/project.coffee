mongoose = require("mongoose")

projectSchema = new mongoose.Schema
  title: String

mongoose.model 'Project', projectSchema