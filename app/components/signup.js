// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var NotificationSystem = require('react-notification-system');

// Creating the Form component
var Signup = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { email: "", password: "", loginStatus: false, userID: "" };
  },

  // This function will respond to the user input
  handleEmail: function(event) {
    this.setState({ email: event.target.value });

  },

  handlePassword: function(event) {
    this.setState({ password: event.target.value });

  },

  _notificationSystem: null,

  _addNotification: function(message, level) {
    this._notificationSystem.addNotification({
      message: message,
      level: level,
      position: "bl"
    });
  },

  componentDidMount: function(){
    this._notificationSystem = this.refs.notificationSystem;
  },

  saveUser: function(){
    var self = this;
    var data = {
      email: this.state.email,
      password: this.state.password
    }
    //stops the user from submitting blank fields
    if(data.email.length === 0 || data.password.length === 0){
      self._addNotification("missing required fields","warning");

    } else {
      helpers.createUser("/user/create", data)
      .then(function(res){
        self.setState({ loginStatus: true, userID: res.data._id});
        localStorage.clear();
        // Store all content into localStorage
        localStorage.setItem("loginStatus", self.state.loginStatus);
        localStorage.setItem("userID", self.state.userID);
        localStorage.setItem("email", self.state.email);
        location.href = "/notes";
      }); 
    }
  }, 
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="col-md-3 signUpDiv">
      <NotificationSystem ref="notificationSystem" />
        <form>
          <div className="form-group">
              <h4 className="">
                <strong>Sign Up</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.email}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleEmail}
                required
                placeholder = "Email"
              />
              <br />
              <input
                value={this.state.password}
                type="password"
                className="form-control text-center"
                id="term"
                onChange={this.handlePassword}
                required
                placeholder = "Password"
              />
            </div>
          </form>
          <div className="buttons"> 
            <a href="#/login"><button className="btn btn-primary loginBtn">Log In</button></a>
            <button onClick={this.saveUser} className="btn btn-primary submitBtn">Submit</button>          
          </div>
        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Signup;
