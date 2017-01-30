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

  componentDidMount: function(){
    var userID = localStorage.getItem("userID");
    var loginStatus = localStorage.getItem("loginStatus");
    console.log(loginStatus);
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
      console.log(transcript);
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
    var loginStatus = localStorage.getItem("loginStatus");
    if(this.state.title === ""){
      console.log("title required");
      alert("Title is a required field");
      return
    }
    if(loginStatus == null){
      alert("Please Sign in to Save a Note");
      return
    }
    var data = {
      title: this.state.title,
      body: this.state.body,
      id: this.state.userID
    }
    console.log(data)
    helpers.createNote("/note/save", data)
    .then(alert("Note Saved"));
  },

  resetRecording: function(){
    var self = this;
    console.log("reset");
    self.setState({
      body: " "
    });
    location.reload();
  },

  stopRecording: function(){
    this.setState({
      recording: false
    });
    // window.location.reload();
  },
  titleChange: function(event){
    this.setState({ 
      title: event.target.value
    });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
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
