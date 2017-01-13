var Note = require("../models/note.js");
var User = require("../models/user.js");

module.exports = function (app) {

  // var exampleUser = new User({
  //   name: "Ernest Hemingway"
  // });
  // // Using the save method in mongoose, we create our example user in the db
  // exampleUser.save(function(error, doc) {
  //   // Log any errors
  //   if (error) {
  //     console.log(error);
  //   }
  //   // Or log the doc
  //   else {
  //     console.log(doc);
  //   }
  // });

  // Route to see what user looks like WITH populating
  app.get("/note/all", function(req, res) {
    // Prepare a query to find all users..
    //var userId = req.body.userId;
    User.find({ '_id': '5874fc6ebb05b580d2553926' })
      // ..and on top of that, populate the notes (replace the objectIds in the notes array with bona-fide notes)
      .populate("notes")
      // Now, execute the query
      .exec(function(error, doc) {
        // Send any errors to the browser
        if (error) {
          res.send(error);
        }
        // Or send the doc to the browser
        else {
          res.send(doc);
        }
      });
  });

  // Route to see what user looks like WITH populating
  app.post("/note/delete/:noteId", function(req, res) {
    // Prepare a query to find all users..
    //var userId = req.body.userId;
    var noteId = req.params.noteId;
    console.log(noteId)
    Note.remove({ '_id': noteId })
      // Now, execute the query
      .exec(function(error, doc) {
        // Send any errors to the browser
        if (error) {
          res.send(error);
        }
        // Or send the doc to the browser
        else {
          res.redirect("/notes");
          console.log("deleted");
        }
      });
  });
  //need to check if works
  // New note creation via POST route
  app.post("/note/save", function(req, res) {
    // Use our Note model to make a new note from the req.body
    var newNote = new Note(req.body);
    // Save the new note to mongoose
    newNote.save(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Otherwise
      else {
        // Find our user and push the new note id into the User's notes array
        User.findOneAndUpdate({'_id': '5874fc6ebb05b580d2553926'}, { $push: { "notes": doc._id } }, { new: true }, function(err, newdoc) {
          // Send any errors to the browser
          if (err) {
            res.send(err);
          }
          // Or send the newdoc to the browser
          else {
            res.send(newdoc);
          }
        });
      }
    });
  });

};
