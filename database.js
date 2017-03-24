var mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/app_test'; // to be determined

mongoose.connect(uri);
var conn = mongoose.connection;

// create Schema/Model ==============



module.exports = conn;