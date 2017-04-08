var mongoose = require('mongoose');
var Connection = require('./db');

// Schema for TravelNote ========================
var noteSchema = mongoose.Schema({
	title 				: String,
	author				: {
		uid: mongoose.Schema.Types.ObjectId,
		name: String
	},
	body				: String,
	word_counts			: Number,
	created_time		: Date,
	updated_time 		: Date,
	pv					: Number, // increment by time every one visited
	like_counts			: Number,
	// necessary?
	likes 				: [{
		uid: mongoose.Schema.Types.ObjectId,
		name: String,
	}],
	comment_counts		: Number,
	comments			: [{cid: mongoose.Schema.Types.ObjectId}]

	///////////////// to be supplement /////////////////
	// cities with attractions
	// labels
});

// methods ================================
noteSchema.statics.findById = function(id, cb){
	return this.findOne({_id: mongoose.Types.ObjectId(id)}, cb);
};

noteSchema.statics.findByAuthorName = function(authorName, cb){

	// to be modified after referencing added...
	return this.find({'author': {$elemNatch: {'name': authorName}}},cb);
}

// return brief of the travel note
noteSchema.virtual('brief').get(function(){

	// to be modified
	return "This is a brief for the travel note";
})

noteSchema.statics.findById = function(id, cb){
	return this.find({_id: mongoose.Types.ObjectId(id)}, cb);
};

// return hot travel notes

module.exports = mongoose.model('TravelNote', noteSchema);
