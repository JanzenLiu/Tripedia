var mongoose = require('mongoose');
var Connection = require('./db');

// Schema for TravelNote ========================
var commentSchema = mongoose.Schema({
	note				: {nid: mongoose.Schema.Types.ObjectId},
	author				: {uid: mongoose.Schema.Types.ObjectId, name:String },
	content				: String, // add word limitation?
	created_time		: Date
});

// methods ================================
commentSchema.virtual('cid').get(function(){
	return this._id.toString();
})

module.exports = mongoose.model('Comment', commentSchema);
