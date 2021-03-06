// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {
  // Returns a promise object we can .then() off inside our Parent component
  getNote: function(url, data){
    return axios.post(url, data);
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  deleteNote: function(url) {
    return axios.post(url);
  },
  createNote: function(url, data){
  	return axios.post(url, data);
  }, 
  createUser: function(url, data){
    return axios.post(url, data)
  },

  logUser: function(url, data){
    return axios.post(url, data)
  }
};
