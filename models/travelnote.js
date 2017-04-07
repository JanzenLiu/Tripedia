var mongoose = require('mongoose');
var Connection = require('./db');

// Schema for TravelNote ========================
var noteSchema = mongoose.Schema({
	title 				: String,
	author				: {
		uid: Schema.Types.ObjectId,
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
	comments			: [{cid: mongoose.Schema.Types.ObjectId}]

	///////////////// to be supplement /////////////////
	// cities with attractions
	// labels
});

// methods ================================
noteSchema.virtual('nid').get(function(){
	return this._id.toString();
})

module.exports = mongoose.model('TravelNote', noteSchema);
