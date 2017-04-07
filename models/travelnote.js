var mongoose = require('mongoose');

// Schema for TravelNote ========================
var noteSchema = mongoose.Schema({
	title 				: String,
	author				: Schema.Types.ObjectId,
	content				: String,
	word_count			: Number,
	create_time			: Timestamp,
	moddify_time 		: Timestamp,
	pv					: Number, // increment by time every one visited
	like_count			: Number,
	likes 				: [{uid: ObjectId}],
	comment_count		: Number,
	comments			: [{
		uid: ObjectId,
		message: String,
		create_time: Timestamp
	}]

	///////////////// to be supplement /////////////////
	// cities with attractions
	// labels
});

// methods ================================

module.exports = mongoose.model('TravelNote', noteSchema);
