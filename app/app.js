// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

//var Main = require("./components/main");
var Saved = require("./components/saved");
var Build = require("./components/builder");

// Grabs the Routes
var routes = require("../routing/react-router.js");

// This code here allows us to render our main component (in this case Parent)
if (document.querySelector('#app')) {
	ReactDOM.render(routes, document.getElementById("app"));
} else if(document.querySelector('#appSaved')){
	ReactDOM.render(<Saved />, document.getElementById("appSaved"));
} else {
	ReactDOM.render(<Build />, document.getElementById("builder"));
}
