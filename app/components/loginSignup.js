// Include React
var React = require("react");

// Creating the Form component
var LoginSignupModule = React.createClass({
  // Here we describe this component's render method
  render: function() {
    return ( 
		<div className="col-md-3 signUpDiv">
		  <p>Log in or Sign up today!</p>
		  <div className="buttons">
		    <a href="#/login"><button className="btn btn-primary logInBtn">Log In</button></a>
            <a href="#/signup"><button className="btn btn-primary signUpBtn">Sign Up</button></a>               
		  </div>
		</div>
    );
  }
});

// Export the component back for use in other files
module.exports = LoginSignupModule;


