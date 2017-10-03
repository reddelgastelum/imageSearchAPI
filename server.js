// server.js
// where your node app starts

// init project
var express = require('express');
var GoogleSearch = require('google-search');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var googleSearch = new GoogleSearch({
    key:'AIzaSyCApkMK7aXTu2sICjTbvugeHeEpvC4fMfA',
    cx:'005615984503445160763:mimerm0isbe'
  });
  
  googleSearch.build({
    q: "tom",
    start: 5,
    fileType: "pdf",
    gl: "tr", //geolocation, 
    lr: "lang_tr",
    num: 10, // Number of search results to return between 1 and 10, inclusive 
    siteSearch: "" // Restricts results to URLs from a specified site 
}, function(error, response) {
  console.log(response);
});
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
