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
      title: "title",
      body: "body"
    };
  },

  speechRecorder: function(){
    var self = this;
    var transcript;
    //console.log(self);
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", function(event){
      //console.log(e.results);
      transcript = Array.from(event.results)
      .map(function(result){return result[0]})
      .map(function(result){return result.transcript})
      .join("")
      
      transcript = "\n" + self.state.body + " " + transcript;
      console.log(transcript);

      self.setState({
        body: transcript
      });

    });


    //recognition.addEventListener("end",recognition.start);
    recognition.start();
  },

  componentDidUpdate: function(prevProps, prevState) {
    var self = this;
    // If we have a new search term, run a new search
    if (prevState.body !== this.state.body) {
      console.log("UPDATED");
      self.speechRecorder();
      };
  },

  saveRecording: function(){
    console.log("save");
    var data = {
      title: this.state.title,
      body: this.state.body}
    helpers.createNote("/note/save", data )
  },

  resetRecording: function(){
    var self = this;
    console.log("reset");
    self.setState({
      body: " "
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
            <section className="col-md-7 noteBuilder">
              <h2> Push start to start creating your personal notes with Note Buddy!</h2>
              {this.state.body}
            </section>
            <section className="col-md-1">
              
            </section>
            <section className="col-md-4 controls">
              <h4> Note Builder Portion</h4>
              <article>
                <h2> Start/Stop</h2>
                <button className="btn btn-danger" id="delete" onClick={this.speechRecorder}> Start</button>
                <button className="btn btn-danger" id="delete"> Stop</button>                
              </article> 
              <article>
                <h2> Note Builder Portion</h2>
                <button className="btn btn-danger" id="delete" onClick={this.saveRecording}> Save</button>
                <button className="btn btn-danger" id="delete" onClick={this.resetRecording}> Reset</button>                
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
