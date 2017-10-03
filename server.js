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
app.get("/:q?", function (req, res) {
  var result = {};
  var queryStr = req.params.q;
  var offset = req.query.offset;
  var googleSearch = new GoogleSearch({
    key:'AIzaSyCApkMK7aXTu2sICjTbvugeHeEpvC4fMfA',
    cx:'005615984503445160763:mimerm0isbe'
  });
  
  googleSearch.build({
    q: queryStr,
    searchType: "image",
    num: 10, // Number of search results to return between 1 and 10, inclusive
    start: 20
  }, function(error, response) {
    console.log(response.queries);
    var temp = response.items;
    //console.log(temp);
    var arr = [];
    for (var i in temp) {
      result.url = temp[i].link;
      result.snippet = temp[i].snippet;
      result.context = temp[i].image.contextLink;
      result.thumbnail = temp[i].image.thumbnailLink;
      arr.push(result);
    }
    res.send(arr);
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
