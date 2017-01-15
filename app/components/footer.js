// Include React
var React = require("react");

// Create the Parent Component
var Footer = React.createClass({

  // Here we render the function
  render: function() {
    return (
      <footer className="footer">
          <p>&copy; Tasha Casagni</p>
      </footer>
    );
  }
});

// Export the component back for use in other files
module.exports = Footer;
