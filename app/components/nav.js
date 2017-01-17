// Include React
var React = require("react");
var LoginSignup = require("../components/loginSignup");


// Create the Parent Component
var Nav = React.createClass({

  hamburgerToggle: function(){
    var self = this;
    self.classList.toggle('active');
  },

  // Here we render the function
  render: function() {
    return (
        <nav className="bg-info navbar">
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
              <li className="active"><a href="#" data-toggle="modal" data-target="#logSign">Login/Signup</a></li>
            </ul>
          </div>
        </div>

        <div className="modal fade" id="logSign" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <div>
                    <LoginSignup />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
        </div> 
        </nav>
    );
  }
});

// Export the component back for use in other files
module.exports = Nav;
