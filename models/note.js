// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var NoteSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
});

// Create the Model
var Note = mongoose.model("Note", NoteSchema);

// Export it for use elsewhere
module.exports = Note;
