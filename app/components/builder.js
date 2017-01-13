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
      user: "",
      pass: ""
    };
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="content">
          <Nav />
          <div className="row">
            <h2>Note Builder</h2>
          </div>
          <div className="row">
            <section className="col-md-6">
              <h2> Note Builder Portion</h2>
            </section>
            <section className="col-md-6">
              <h2> Note Builder Portion</h2>
              <article>
                <h2> Start/Stop</h2>
                <button className="btn btn-danger" id="delete"> Start</button>
                <button className="btn btn-danger" id="delete"> Stop</button>                
              </article>
              <article>
                <h2> Note Builder Portion</h2>
                <button className="btn btn-danger" id="delete"> Bold</button>
                <button className="btn btn-danger" id="delete"> Under Line</button>
                <button className="btn btn-danger" id="delete"> Italics </button>                 
              </article>  
              <article>
                <h2> Note Builder Portion</h2>
                <button className="btn btn-danger" id="delete"> Save</button>
                <button className="btn btn-danger" id="delete"> Reset</button>                
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
