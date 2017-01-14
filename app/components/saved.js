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
      notes: [{title: "title", content:"content"},{title: "title", content:"content"}] 
    };
  },
  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    // The moment the page renders on page load, we will retrieve the previous click count.
    // We will then utilize that click count to change the value of the click state.
    helpers.getNote("/note/all")
      .then(function(response) {
        // Using a ternary operator we can set newClicks to the number of clicks in our response object
        // If we don't have any clicks in our database, set newClicks to 0
        var userNotes = response.data[0].notes;
        this.setState({
          notes: userNotes
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", userNotes);
      }.bind(this));
  },

  deleteNote: function(id){
    var noteId = id;
    console.log(noteId);
    helpers.deleteNote("/note/delete/"+ noteId)
      .then(function(response) {
    });
  },

  renderNotes: function(){
    var self = this;
    return this.state.notes.map(function(search, i) {
      return (
        <article key={i} className="savedNote">{search.title} - {search.content}
          <br/>
          <button type="button" className="btn btn-danger" onClick={self.deleteNote.bind(null, search._id)} id="delete" data-id={search._id}> Delete Note</button>
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
