var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
// Schema for User ========================
var userSchema = Schema({
	username			: String,
	password			: String,
	name				: String,
	gender				: String, // "M" for male, "F" for female... Add verification
	following_counts	: Number,
	follower_counts		: Number,
	travel_note_counts	: Number,

	// travel notes collection: add more fields for conveniece?
	travel_notes_id		:[{
		nid 	: Schema.Types.ObjectId, // type declaration correct?
		title 	: String
	}]

	//////////////////// to be supplement //////////////////////
	// email
});

module.exports = mongoose.model('User', userSchema);
// var mongoose = require('mongoose');
// var mongodb = require('mongodb');
// var test = require('./t_dbinit.js');

// var Schema = mongoose.Schema;

// if(test.db){

// 	// var colc = test.db.collection('message');

// 	var userSchema = new Schema({

// 		username			: String,
// 		password			: String,
// 		name				: String,
// 		gender				: String, // "M" for male, "F" for female... Add verification
// 		following_counts	: Number,
// 		follower_counts		: Number,
// 		travel_note_counts	: Number,

// 		travel_notes_id		:[{
// 			nid 	: Schema.Types.ObjectId, // type declaration correct?
// 			title 	: String
// 		}]

// 	});

// 	var userModel = mongoose.model('User', userSchema);

// 	var t1 = new userModel({

// 		username: 'test___2',
// 		password: 'goodbyeworld',
// 		name: 'davilwu',
// 		gender: 'M',
// 		following_counts: 52,
// 		follower_counts: 231,
// 		travel_notes_counts: 5
// 	});

// 	// colc.insert(t1);
// 	t1.save();

// 	test.db.close();
// }