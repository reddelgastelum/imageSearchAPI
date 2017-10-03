// server.js
// where your node app starts

// init project
var express = require('express');
var Search = require('bing.search')
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var search = new Search('7a0d177c-ea53-4805-af1e-dd5cc4dddb21');
  
  search.web('Tutta Bella Neapolitan Pizzeria',{top: 5},function(err, results) {
    console.log(err);
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
