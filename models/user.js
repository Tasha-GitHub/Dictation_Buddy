// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var UserSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  // notes property for the user
  notes: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "Note"
  }]
});

// Create the Model
var User = mongoose.model("User", UserSchema);

// Export it for use elsewhere
module.exports = User;
