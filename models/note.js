// Include the Mongoose Dependencies
var mongoose = require("mongoose");
var validators = require('mongoose-validators');

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

// Create the Model
var Note = mongoose.model("Note", NoteSchema);

// Export it for use elsewhere
module.exports = Note;
