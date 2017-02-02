// Include React
var React = require("react");

// Here we include all of the sub-components
var Signup = require("../components/signup");
var Login = require("../components/login");
var Nav = require("../components/nav");
var Footer = require("../components/footer");
// Requiring our helper for making API calls
var helpers = require("../utils/helpers");
//localStorage.clear();

var NotificationSystem = require('react-notification-system');

// Create the Parent Component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return {
      title: "",
      body: " ",
      recording: true,
      email: "", 
      password: "",
      loginStatus: false, 
      userID: ""
    };
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
    var userID = localStorage.getItem("userID");
    var loginStatus = localStorage.getItem("loginStatus");
    // grabs user id from local storage and stores it as a state value
    if (loginStatus == null) {
      //console.log("bye")
      this.setState({
        loginStatus: false
      });
    } else {
      this.setState({
        userID: userID,
        loginStatus: true
      });      
    }
  },

  speechRecorder: function(){
    var self = this;
    var transcript;      
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();
    recognition.interimResults = true;

    var p = document.createElement("p");
    var words = document.querySelector(".noteBuilder");
    words.appendChild(p);

    recognition.addEventListener("result", function(event){
      //console.log(e.results);
      transcript = Array.from(event.results)
      .map(function(result){return result[0]})
      .map(function(result){return result.transcript})
      .join("")
      
      //transcript = "\n" + self.state.body + " " + transcript;
      //console.log(transcript);
      p.textContent = transcript;
      if(event.results[0].isFinal){
        self.setState({
          body: self.state.body + "\n" + transcript
        });
        p =  document.createElement("p");
        words.appendChild(p);
      }
    });
    recognition.addEventListener("end",recognition.start);
    recognition.start();
  },

  saveRecording: function(prevProps, prevState){
    var self = this;
    var loginStatus = localStorage.getItem("loginStatus");
    if(this.state.title === ""){
      self._addNotification("Title is a required field","warning");
      return
    }
    if(loginStatus == null){
      self._addNotification("Please Sign in to Save a Note","warning");
      return
    }

    if(loginStatus === "false"){
      self._addNotification("Please Sign in to Save a Note","warning");
      return
    }
    
    var data = {
      title: this.state.title,
      body: this.state.body,
      id: this.state.userID
    }

    helpers.createNote("/note/save", data)
    .then(
      self._addNotification("Note Successfully Saved","success")
    );
  },

  resetRecording: function(){
    var self = this;
    console.log("reset");
    self.setState({
      body: " "
    });
    location.reload();
  },

  titleChange: function(event){
    this.setState({ 
      title: event.target.value
    });
  },
  // Here we render the function
  render: function() {
    var self = this;
    return (
      <div className="container">
      <NotificationSystem ref="notificationSystem" />
        <div className="content">
          <Nav />
          <div className="row components">
            <section className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noteBuilder fade-in">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <h4 className="">
                    <strong>Title</strong>
                  </h4>
                  <input
                  value={this.state.title}
                  type="text"
                  className="form-control text-center"
                  id="title"
                  onChange={this.titleChange}
                  required
                  placeholder = "Type Title Here"
                  />
                </div>
              </form>
            </section>
            <section className="col-lg-3 col-md-4 col-sm-12 col-xs-12 controls fade-in">
              <h2> Editor Tools</h2>
              <article>
                <h3>Start Recording</h3>
                <button className="btn btn-danger" id="start" onClick={this.speechRecorder}> Start</button>               
              </article> 
              <article>
                <h3>Save/Reset</h3>
                <button className="btn btn-danger" id="save" onClick={this.saveRecording}> Save</button>
                <button className="btn btn-danger" id="reset" onClick={this.resetRecording}> Reset</button>                
              </article>                           
            </section>
          </div>          
        </div>
        <Footer />
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
