var Note = require("../models/note.js");
var User = require("../models/user.js");
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var userId;

module.exports = function (app) {

  // Route to see what user looks like WITH populating
  app.post("/note/all", function(req, res) {
    // Prepare a query to find all users..
    var id = req.body.id;
    console.log(req.body)
    console.log(id)
    User.find({ '_id': id })
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
    var newNote = new Note({ 
      title: req.body.title,
      body: req.body.body,
      id: req.body.userID
    });
    console.log(req.body);
    // Save the new note to mongoose
    newNote.save(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Otherwise
      else {
        // Find our user and push the new note id into the User's notes array
        User.findOneAndUpdate({'_id': req.body.id}, { $push: { "notes": doc._id } }, { new: true }, function(err, newdoc) {
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

    // New user creation via POST route
  app.post("/user/create", function(req, res) {
    console.log(req.body);
    var password = req.body.password;
    var email = req.body.email;
    console.log(password)
    bcrypt.hash(password, null, null, function (err, hash) {
      var exampleUser = new User({
        email: email,
        password: hash
      });
      // Using the save method in mongoose, we create our example user in the db
      exampleUser.save(function(error, doc) {
        // Log any errors
        if (error) {
          //console.log(error);
        }
        // Or log the doc
        else {
          //console.log(doc);
          res.send(doc);
          res.redirect("/");

        }
      });
    });
  });

};
