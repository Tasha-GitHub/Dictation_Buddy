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

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="content">
          <Nav />
          <div className="row">
            <h2>My Notes</h2>
          </div>
          <div className="row">
            <section  className="notesDiv">
              {this.state.notes.map(function(search, i) 
                {return (
                  <article key={i} className="savedNote">
                  {search.title} - {search.content}
                  <br/>
                  <button className="btn btn-danger" id="delete"> Delete Note</button>
                  </article>
                );}
              )}
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
