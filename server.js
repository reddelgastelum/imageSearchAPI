// server.js
// where your node app starts

// init project
var express = require('express');
var mongoose = require('mongoose');
var GoogleSearch = require('google-search');
var Search = require('./models/search')
var app = express();

mongoose.connect(process.env.DATABASE_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo connected to database ' + process.env.DATABASE_URI);
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log(true);
  Search.find({}, function(err, search) {
    console.log(search);
    res.send(search);
  });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:q?", function (req, res) {
  var result = {};
  var queryStr = req.params.q;
  var offset = req.query.offset * 10 - 9;
  
  var search = new Search({
    searchTerm:queryStr,
    time: new Date()
  });
  
  search.save();
  
  var googleSearch = new GoogleSearch({
    key:'AIzaSyCApkMK7aXTu2sICjTbvugeHeEpvC4fMfA',
    cx:'005615984503445160763:mimerm0isbe'
  });
  
  googleSearch.build({
    q: queryStr,
    searchType: "image",
    num: 10,
    start: offset
  }, function(error, response) {
    //console.log(response);
    var temp = response.items;
    var arr = [];
    for (var i in temp) {
      arr.push({url:temp[i].link,snippet:temp[i].snippet,context:temp[i].image.contextLink,thumbnail:temp[i].image.thumbnailLink});
    }
    res.send(arr);
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
