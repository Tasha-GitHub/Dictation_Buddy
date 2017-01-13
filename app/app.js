// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

var Main = require("./components/main");
var Saved = require("./components/saved");
var Build = require("./components/builder");


// This code here allows us to render our main component (in this case Parent)
if (document.querySelector('#app')) {
	ReactDOM.render(<Main />, document.getElementById("app"));
} else if(document.querySelector('#appSaved')){
	ReactDOM.render(<Saved />, document.getElementById("appSaved"));
} else {
	ReactDOM.render(<Build />, document.getElementById("builder"));
}

//ReactDOM.render(<Saved />, document.getElementById("appSaved"));
