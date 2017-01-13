var path = require('path');

module.exports = function (app) {
  // Main "/" Route. This will redirect the user to our rendered React application
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });

    // Main "/" Route. This will redirect the user to our rendered React application
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/saved.html"));
  });


    // Main "/" Route. This will redirect the user to our rendered React application
  app.get("/builder", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/builder.html"));
  });

};


