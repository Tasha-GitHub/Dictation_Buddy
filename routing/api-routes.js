var Note = require("../models/note.js");

module.exports = function (app) {

  //shows all saved notes
  app.get("/api", function(req, res) {

    // We will find all the records
    Note.find({})
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
  });

// app.post("/save", function(req, res) {

//   var title = req.body.title;
//   var content = req.body.content;

//   // Note how this route utilizes the findOneAndUpdate function to update the clickCount
//   // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
//   // If included, Mongoose will create a new document matching the description if one is not found
//   Note.create({
//     location: title,
//     content: content
//   }, function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send("Saved Search");
//     }
//   });
// });
};
