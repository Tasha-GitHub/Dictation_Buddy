// Include React
var React = require("react");
var helpers = require("../utils/helpers");

// Creating the Form component
var Login = React.createClass({

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

  logUser: function(){
    var self = this;
    var data = {
      email: this.state.email,
      password: this.state.password
    }

    helpers.logUser("/user/login", data)
    .then(function(res){
      console.log(res);
      self.setState({ loginStatus: true, userID: res.data._id});
      localStorage.clear();
      // Store all content into localStorage
      localStorage.setItem("loginStatus", self.state.loginStatus);
      localStorage.setItem("userID", self.state.userID);
      location.reload();
    }); 
  }, 
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="col-md-3 signUpDiv">
        <form>
          <div className="form-group">
              <h4 className="">
                <strong>Log in</strong>
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
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handlePassword}
                required
                placeholder = "Password"
              />
            </div>
          </form>
          <div className="buttons"> 
            <a href="#/signup"><button className="btn btn-primary loginBtn">Sign up</button></a>
            <button onClick={this.logUser} className="btn btn-primary submitBtn">Submit</button>          
          </div>
        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Login;
