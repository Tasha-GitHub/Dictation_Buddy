// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("../components/signup");
var Nav = require("../components/nav");
var Footer = require("../components/footer");
// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Parent Component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return {
      user: "",
      pass: ""
    };
  },
  // Whenever the button is clicked we'll use setState to add to the clickCounter
  // Note the syntax for setting the state
  handleClick: function() {
    this.setState({ clicks: this.state.clicks + 1 });
  },

  // Whenever the button is clicked we'll use setState to reset the clickCounter
  // This will reset the clicks -- and it will be passed ALL children
  resetClick: function() {
    this.setState({ clicks: 0 });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <Nav />
        <div className="row">
          <h2>Dictation Buddy</h2>
        </div>
        <div className="row">
          <div className="col-md-12">
          </div>
          <Form />
        </div>
        
        <Footer />
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
