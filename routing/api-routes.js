var Note = require("../models/note.js");


// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
module.exports = function (app) {
//   app.get("/api", function(req, res) {

//   // This GET request will search for the latest clickCount
//   Click.find({}).exec(function(err, doc) {

//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/save", function(req, res) {

  var title = req.body.title;
  var content = req.body.content;

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount
  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
  // If included, Mongoose will create a new document matching the description if one is not found
  Note.create({
    location: title,
    content: content
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});
};
