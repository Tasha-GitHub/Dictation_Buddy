// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../app/components/main");
var Saved = require("../app/components/saved");
var Builder = require("../app/components/builder");
var Login = require("../app/components/login");
var Signup = require("../app/components/signup");
var LoginSignup = require("../app/components/LoginSignup");
var Nav = require("../app/components/nav");

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Info or Chat show the appropriate component */}
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />

      {/* If user selects any other path... we get the Info Route */}
      <IndexRoute component={LoginSignup} />

    </Route>
  </Router>

);
