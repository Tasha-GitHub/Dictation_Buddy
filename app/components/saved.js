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
      notes: [],
      email: "",
      password: "", 
      loginStatus: false, 
      userID: "",
      componentLoaded: false
    };
  },
  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");
    //localStorage.clear();
    // grabs user id from local storage and stores it as a state value
    var userID = localStorage.getItem("userID");
    var loginStatus = localStorage.getItem("loginStatus");
    //console.log(userID);
    //console.log(loginStatus);
    this.setState({
      userID: userID,
      loginStatus: loginStatus
    });
  },

  componentDidUpdate: function(){
    var self = this;
    console.log("COMPONENT Updated");
    var data = {
      id: this.state.userID
    }

    //console.log(this.state.loginStatus)
    if(this.state.loginStatus = true){
      if(self.state.componentLoaded == false){
        //console.log("componend loaded is false")
        helpers.getNote("/note/all", data)
        .then(function(response) {
          //console.log(response);
          var userNotes = response.data[0].notes;
          this.setState({
            notes: userNotes,
            componentLoaded: true
          });
        }.bind(this));
      }

    }

  },

  deleteNote: function(id){
    var noteId = id;
    console.log(noteId);
    helpers.deleteNote("/note/delete/"+ noteId)
      .then(function(response) {
        location.reload();
    });
  },

  printNote: function(){
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
