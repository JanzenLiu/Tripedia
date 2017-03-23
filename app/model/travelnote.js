var mongoose = require('mongoose');

// Schema for TravelNote ========================
var noteSchema = mongoose.Schema({
	title 				: String,
	author				: {
		uid: Schema.Types.ObjectId
		name: String
	}
	body				: String,
	word_counts			: Integer,
	created_time		: Timestamp,
	last_modified_time 	: Timestamp,
	like_counts			: Integer,
	// necessary?
	likes 				: [{
		uid: ObjectId,
		name: String,
	}]
	comment_counts		: Integer,
	comments			: [{
		uid: ObjectId,
		name: String
		message: String,
		created_time: Timestamp,
		like_counts: Integer
	}]

	///////////////// to be supplement /////////////////
	// cities with attractions
	// labels
});

// methods ================================

module.exports = mongoose.model('TravelNote', noteSchema);
