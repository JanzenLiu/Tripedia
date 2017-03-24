var mongoose = require('mongoose');
var mongodb = require('mongodb');
var test = require('./t_dbinit.js');

// // use Cursor to iterate through each document in the cursor
// db.collection.find().forEach(function(doc){
// 	console.log(doc.content);
// });

// console.log(test);

if(test.db){

	test.model.find(function(err, docs){
		docs.forEach(function(doc){
			console.log(doc);
		});
	});

	test.db.close();
}