// Include React
var React = require("react");


// Create the Parent Component
var Nav = React.createClass({

  // Here we render the function
  render: function() {
    return (
        <nav className="bg-info navbar">
          <div>
            <ul className="nav nav-pills" role="tablist">
              <li role="presentation" className="navigation"><a href="/">Dictation Buddy</a></li>
              <li role="presentation" className="navigation"><a href="/notes">Saved Notes</a></li>
              <li role="presentation" className="navigation"><a href="/builder">Note Builder</a></li>
            </ul>
          </div>
        </nav>
    );
  }
});

// Export the component back for use in other files
module.exports = Nav;
