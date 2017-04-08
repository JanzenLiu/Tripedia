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
		name: String
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

noteSchema.statics.findByTitle = function(title, cb){
	return this.find({title: title}, cb);
}

noteSchema.statics.findByAuthorName = function(authorName, cb){

	// to be modified after referencing added...
	return this.find({'author': {$elemNatch: {'name': authorName}}},cb);
};

noteSchema.statics.isLiked = function(nid, uid, cb){
	return this.findOne({

	// check if user has already liked the note
	// return null if not liked by the user, and the note elsewhere
		_id: mongoose.Types.ObjectId(nid),
		'likes': {
			$elemMatch: {'uid': mongoose.Types.ObjectId(uid)}
		}
	}, cb);
};

// return brief of the travel note
noteSchema.virtual('brief').get(function(){

	// to be modified
	return "This is a brief for the travel note";
})

// to change the instance method to static method
noteSchema.methods.likedBy = function(uid, username, cb){

	// remember to check whether the user has already liked the note in controller
	return this.update({
		$push: {"likes": {
			uid: mongoose.Types.ObjectId(uid),
			name: username
		}},
		$inc: {"like_counts": 1}
	}).exec();
}

noteSchema.methods.dislikedBy = function(uid, cb){

	// remember to check whether the user has already liked the note in controller
	return this.update({
		$pop: {"likes": {
			uid: mongoose.Types.ObjectId(uid),
		}},
		$inc: {"like_counts": -1}
	}).exec();
}

// return hot travel notes

module.exports = mongoose.model('TravelNote', noteSchema);
