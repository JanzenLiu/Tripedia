var mongoose = require('mongoose');

// Schema for TravelNote ========================
var noteSchema = mongoose.Schema({
	title 				: String,
	author				: {
		uid: Schema.Types.ObjectId
		name: String
	}
	body				: String,
	word_counts			: Number,
	created_time		: Timestamp,
	updated_time 		: Timestamp,
	pv					: Number, // increment by time every one visited
	like_counts			: Number,
	// necessary?
	likes 				: [{
		uid: ObjectId,
		name: String,
	}]
	comment_counts		: Number,
	comments			: [{
		uid: ObjectId,
		name: String
		message: String,
		created_time: Timestamp,
		like_counts: Number
	}]

	///////////////// to be supplement /////////////////
	// cities with attractions
	// labels
});

// methods ================================

module.exports = mongoose.model('TravelNote', noteSchema);
