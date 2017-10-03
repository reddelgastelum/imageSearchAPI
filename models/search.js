var mongoose = require('mongoose');


var searchSchema = mongoose.Schema({
  searchTerm: {
    type:String
  },
  time: {
    type:Date
  }
});


var Search = module.exports = mongoose.model('Search', searchSchema);