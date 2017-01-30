// Include React
var React = require("react");
var LoginSignup = require("../components/loginSignup");


// Create the Parent Component
var Nav = React.createClass({
  // Here we render the function
  render: function() {
    return (
        <nav className="bg-info navbar row">
          <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" onClick={this.hamburgerToggle} data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Dictation Buddy</a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="/notes">Saved Notes</a></li>
                <li className="active"><a href="/builder">Note Builder</a></li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
});

// Export the component back for use in other files
module.exports = Nav;
