var Note = require("../models/note.js");
var User = require("../models/user.js");
var bcrypt = require('bcrypt-nodejs');
var sanitize = require('mongo-sanitize');
var salt = bcrypt.genSaltSync(10);
var userId;

module.exports = function (app) {

  // Route to see what user looks like WITH populating
  app.post("/note/all", function(req, res) {
    // Prepare a query to find all users..
    var id = req.body.id;
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
    var noteId = req.params.noteId;
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
        }
      });
  });

  app.post("/note/save", function(req, res) {
    var cleanTitle = sanitize(req.body.title);

    // Use our Note model to make a new note from the req.body
    var newNote = new Note({ 
      title: cleanTitle,
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
    var cleanEmail = sanitize(req.body.email);
    var cleanPassword = sanitize(req.body.password);
    var password = cleanPassword;
    var email = cleanEmail;
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
          res.send(doc);
        }
      });
    });
  });

  app.post("/user/login", function (req, res) {
    var cleanEmail = sanitize(req.body.email);
    var cleanPassword = sanitize(req.body.password);
    var email = cleanEmail;
    var password = cleanPassword;
    User.findOne({ email: email })
    .exec(function(error, result) {
      if (error){
        console.log(error);
      } else {
        //if there were no  matching results in the DB, it will send back false instead
        //throwing errors
        if(result == null) {
          res.json({
              confirm: false,
              _id: false,
              email: false,
            });
        } else {
          //this will send back data to the user after it is decrypted
          var passwordConfirmation;
          //captures userID in a variable
          userId = result._id;
          //captures useremail in a variable
          var userName = result.email;
          //grabs users password from db
          var hash = result.password;
          //compares db password and user entered password
          bcrypt.compare(password, hash, function (err, result) {
            // will return true or false depending if the passwords matched up
            passwordConfirmation = result;
            //sends a true and user id back to the front end
            res.json({
              confirm: passwordConfirmation,
              _id: userId,
              email: userName,
            });
          });
        }
      }
    });
  });
};
