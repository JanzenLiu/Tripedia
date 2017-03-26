var mongoose = require('mongoose');
var mongodb = require('mongodb');
var db = require('./t_dbinit.js');
var User = require('./t_model.js');


// // use Cursor to iterate through each document in the cursor
// db.collection.find().forEach(function(doc){
// 	console.log(doc.content);
// });

// console.log(test);

if(db){

	// var t1 = new User({

	// 	username: '1',
	// 	password: 'dsfoan',
	// 	name: 'davilwu',
	// 	gender: 'M',
	// 	following_counts: 52,
	// 	follower_counts: 231,
	// 	travel_notes_counts: 5

	// });
	// var t2 = new User({

	// 	username: '2',
	// 	password: 'oapvnaea',
	// 	name: 'michaellyu',
	// 	gender: 'M',
	// 	following_counts: 94,
	// 	follower_counts: 91857104,
	// 	travel_notes_counts: 342

	// });
	// var t3 = new User({

	// 	username: '3',
	// 	password: 'faokflnva',
	// 	name: 'ericlo',
	// 	gender: 'M',
	// 	following_counts: 234,
	// 	follower_counts: 6134,
	// 	travel_notes_counts: 124

	// });

	// t1.save();
	// t2.save();
	// t3.save();

	User.find(function(err, docs){
		docs.forEach(function(doc){
			console.log(doc);
		});
	});

	db.close();
}