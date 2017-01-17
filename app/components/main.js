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

  // Here we set a generic state associated with the number of clicks
   getInitialState: function() {
    return { email: "a", password: "b", loginStatus: false, userID: "587d81dc2fb8346ed139ce15" };
  },

  componentDidMount: function(){
    var userID = localStorage.getItem("userID");
    var loginStatus = localStorage.getItem("loginStatus");
    console.log(userID);
    console.log(loginStatus);
    this.setState({
      userID: userID,
      loginStatus: loginStatus
    });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="content">
          <Nav />
          <div className="row banner">
            <h1>Dictation Buddy</h1>
          </div>
          <div className="gap gap-top">
            
          </div>
          <div className="row bannerAndSignup">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <h2>About Us</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className="col-md-6 photo-filler">
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 photo-filler-two">
                </div>
                <div className="col-md-6">
                  <h2>About Us</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" >
             {this.props.children}
            </div>
          </div>
          <div className="gap gap-bottom">
            
          </div>          
        </div>
        <Footer />
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
