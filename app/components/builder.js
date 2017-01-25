// Include React
var React = require("react");

// Here we include all of the sub-components
var Signup = require("../components/signup");
var Login = require("../components/login");
var Nav = require("../components/nav");
var Footer = require("../components/footer");
// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Parent Component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return {
      title: "",
      body: " ",
      recording: true,
      email: "a", 
      password: "b",
      loginStatus: false, 
      userID: "587d81dc2fb8346ed139ce15"
    };
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

  componentDidUpdate: function(prevProps, prevState) {
    // var self = this;
    // // If we have a new search term, run a new search
    // if (prevState.body !== this.state.body) {
       console.log("UPDATED");
    //   self.speechRecorder();
    //   };
  },

  saveRecording: function(prevProps, prevState){
    if(this.state.title === ""){
      console.log("title required");
      alert("Title is a required field");
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
          <div className="row">
            <h1>Note Builder</h1>
          </div>
          <div className="row">
            <section className="col-md-7 noteBuilder fade-in">
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
            <section className="col-md-1">
            </section>
            <section className="col-md-4 controls fade-in">
              <h4> Note Editor</h4>
              <article>
                <h2> Start/Stop</h2>
                <button className="btn btn-danger" id="start" onClick={this.speechRecorder}> Start</button>
                <button className="btn btn-danger" id="stop" onClick={this.stopRecording}> Stop</button>                
              </article> 
              <article>
                <h2> Note Builder Portion</h2>
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
