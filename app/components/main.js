// Include React
var React = require("react");

// Here we include all of the sub-components
var Signup = require("../components/signup");
var Login = require("../components/login");
var Nav = require("../components/nav");
var Footer = require("../components/footer");
var LoginSignup = require("../components/loginSignup");
// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Parent Component
var Main = React.createClass({
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="content">
          <Nav />
          <div className="row banner">
            <h1>Dictation Buddy</h1>
          </div>
          <div className="gap">
            
          </div>
          <div className="row bannerAndSignup">
            <div className="row aboutUs">
                <div className="col-md-12">
                  <h2>About Us</h2>
                  <p> Dictation Buddy is your one stop shop for note taking. This app will listen to what you have to say and save it into your note profile. You can print your notes or delete them. This app will automatically update what it believes you have said as you continue to speak to ensure accuracy. Not to mention you can start recording with the press of a button! Start recording today!</p>
                </div>
           </div>
          <div className="gap">
            
          </div>
           <div className="row">
            <div className="col-md-12 loginPortal">
             {this.props.children}
            </div>             
           </div>
          </div>         
        </div>
        <Footer />
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
