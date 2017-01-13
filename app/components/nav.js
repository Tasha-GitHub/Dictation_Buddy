// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("../components/signup");
// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Parent Component
var Nav = React.createClass({

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <nav>
          <p>Naav</p>
        </nav>

      
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Nav;
