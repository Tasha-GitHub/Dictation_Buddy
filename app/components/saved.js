// Include React
var React = require("react");

// Here we include all of the sub-components

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Parent Component
var Saved = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return {
      clicks: "",
      clickID: "Main"
    };
  },

  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    // The moment the page renders on page load, we will retrieve the previous click count.
    // We will then utilize that click count to change the value of the click state.
    helpers.getClicks()
      .then(function(response) {
        // Using a ternary operator we can set newClicks to the number of clicks in our response object
        // If we don't have any clicks in our database, set newClicks to 0
        var newClicks = response.data.length ? response.data[0].clicks : 0;
        this.setState({
          clicks: newClicks
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", newClicks);
      }.bind(this));
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2>Saved Notes</h2>
            <hr />
            <p>
              <em>Now backed by the power of MongoDB!</em>
              Just visit <a href="/api">/api</a> to check out the DB!
            </p>
            <p>
              {/*
                Here we create a button click.
                Note how we have an onClick event associate with our handleClick function.
              */}
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={this.handleClick}
              >
                CLICK ME!!!!
              </button>
              {/* Here we create a button click for resetting the clickCounter */}
              <button
                className="btn btn-danger btn-lg"
                type="button"
                onClick={this.resetClick}
              >
                Reset
              </button>
            </p>
          </div>
          {/* This represents the "Parent" */}
          <div className="col-md-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Parent</h3>
              </div>
              <div className="panel-body text-center">

                {/* This is where we'll show the click count for the parent */}
                <h1>{this.state.clicks}</h1>

                {/*
                  Here we'll deploy the child component.
                  We'll pass it the parent's click counter as a "state"
                */}
                

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
