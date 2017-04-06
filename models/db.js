var mongodb = require('mongodb');
var settings = require('../settings');

var Db =  mongodb.Db,
	Connection = mongodb.Connection,
	Server = mongodb.Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true}); // safe attribute not found in documentation
// ================================================
// ===== using mongoose, export a connection ======
// ================================================
// var mongoose = require('mongoose');
// var settings = require('./settings');

// var uri = 'mongodb://' + settings.host + ':27017/' + settings.db; // to be determined

// mongoose.connect(uri);
// var conn = mongoose.connection;
// console.log('flag');

// // create Schema/Model ==============
// // if necessary?


// module.exports = conn;