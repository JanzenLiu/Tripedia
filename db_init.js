var mongoose = require('mongoose');
var settings = require('./settings');

var uri = 'mongodb://' + settings.host + ':27017/' + settings.db; // to be determined

mongoose.connect(uri);
var conn = mongoose.connection;
console.log('flag');

// create Schema/Model ==============
// if necessary?


module.exports = conn;