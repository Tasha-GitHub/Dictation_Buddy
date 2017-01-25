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

  // Here we set a generic state
  getInitialState: function() {
    return {
      notes: [{
        _id: 2,
        title: "Welcome",
        body: "This is where your notes will be stored, start building notes in the note builder"
        }],
      email: "",
      password: "", 
      loginStatus: false, 
      userID: "",
      componentLoaded: false
    };
  },
  //  On load display users notes
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");
    var userID = localStorage.getItem("userID");
    var loginStatus = localStorage.getItem("loginStatus");
    // grabs user id from local storage and stores it as a state value
    if (loginStatus == null) {
      console.log("bye")
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

  componentDidUpdate: function(){
    //saves this for helper function
    var self = this;
    console.log("COMPONENT Updated");
    //grabs users ID from state
    var data = {
      id: this.state.userID
    }
    //checks to see if a user is logged in and sends a response accoridnly
    if(this.state.loginStatus === true){
      if(self.state.componentLoaded == false){
        helpers.getNote("/note/all", data)
        .then(function(response) {
          var userNotes = response.data[0].notes;
          //if user has no notes, return and use default note
          if(userNotes.length === 0 ){
            return
          }else{
            this.setState({
              notes: userNotes,
              componentLoaded: true
            });            
          }
        }.bind(this));
      }
    } else {
      //if the user is not logged in, it will show a helper card that tells them to login
      if(self.state.componentLoaded == false){
        this.setState({
          notes: [{
            _id: 1,
            title: "Plese Log in to Start Saving Notes!",
            body: "Thank You"
          }],
          componentLoaded: true
        });
      }      
    }
  },

  deleteNote: function(id){
    //deletes a user note by sending the corresponding note id to a delete path
    var noteId = id;
    console.log(noteId);
    helpers.deleteNote("/note/delete/"+ noteId)
    .then(function(response) {
      location.reload();
    });
  },

  printNote: function(){
    //print notes
    window.print();
  },

  renderNotes: function(){
    var self = this;
    return this.state.notes.map(function(search, i) {
      return (
        <article key={i} className="savedNote">
          <div className="noteHighlight">
            <p>{search.title}</p>
            <hr/>
            <div className="bodyText">
              <p>{search.body}</p>
            </div>
            <hr/>
          </div>
          <button type="button" className="btn btn-danger" onClick={self.deleteNote.bind(null, search._id)} id="delete" data-id={search._id}> Delete Note</button>
          <button type="button" className="btn btn-info" id="open" data-id={search._id} data-toggle="modal" data-target={"#"+search._id}> Open Note</button>

          <div className="modal fade" id={search._id} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Note Preview</h4>
                </div>
                <div className="modal-body">
                  <div>
                      <div className="row">
                        <div className="col-md-10 col-sm-110 col-xs-10">
                          <p>{search.title}</p>
                          <p>{search.body}</p>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2">
                          <button type="button" className="btn btn-info" id="print" onClick={self.printNote} data-id={search._id}> Print Note</button>
                        </div>                     
                      </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>  
        </article>
      );
    });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="content">
          <Nav />
          <div className="row">
            <h1>My Notes</h1>
          </div>
          <div className="row">
            <section  className="notesDiv">
              {this.renderNotes()}
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
