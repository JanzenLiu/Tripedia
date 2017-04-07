var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema for TravelNote ========================
var noteSchema = Schema({
	title 				: String,
	author				: {type: Schema.Types.ObjectId, ref: 'User'},
	content				: String,
	word_count			: Number,
	create_time			: Timestamp,
	moddify_time 		: Timestamp,
	pv					: Number, // increment by time every one visited
	like_count			: Number,
	likes 				: [{type: Schema.Types.ObjectId, ref: 'User'}],
	comment_count		: Number,
	comments			: [{
		author: {type: Schema.Types.ObjectId, ref: 'User'},
		message: String,
		create_time: Timestamp
	}]

	///////////////// to be supplement /////////////////
	// cities with attractions
	// labels
});

// methods ================================

module.exports = mongoose.model('TravelNote', noteSchema);
