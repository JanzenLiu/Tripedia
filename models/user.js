var mongoose = require('mongoose');
var Connection = require('./db');

// Schema for User ========================
var userSchema = new mongoose.Schema({
	username			: String,
	password			: String,
	name				: String,
	email				: String, // add validation
	gender				: String, // "M" for male, "F" for female... Add verification
	following_counts	: Number,
	follower_counts		: Number,
	travel_note_counts	: Number,

	// travel notes collection: add more fields for conveniece?
	// add reference info
	followers  			:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	followings  		:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	travel_notes		:[{type: mongoose.Schema.Types.ObjectId, ref: 'TravelNote'}]

	//////////////////// to be supplement //////////////////////
	// email
});

// methods ================================
userSchema.virtual('uid').get(function(){
	return this._id.toString();
})

userSchema.statics.findById = function(id, cb){
	return this.find({_id: mongoose.Types.ObjectId(id)}, cb);
};

userSchema.methods.follow = function(id, cb){
	return this.update({
		$push: {"followings": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {following_counts: 1}
	}).exec();
}

userSchema.methods.followedBy = function(id, cb){
	return this.update({
		$push: {"followers": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {follower_counts: 1}
	}).exec();
}

userSchema.methods.unfollow = function(id, cb){
	return this.update({
		// check whether the user with uid: id is followed by the current user

		$pop: {"followings": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {following_counts: -1}
	}).exec();
}

userSchema.methods.unfollowedBy = function(id, cb){
	return this.update({
		// check whether the user with uid: id is following the current user

		$pop: {"followers": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {follower_counts: -1}
	}).exec();
}

// generating a hash
// userSchema.methods.generateHash = function(password){
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // check the validation of the password
// userSchema.methods.validatePassword = function(password){
// 	return bcrypt.compareSync(password, this.local.password;
// };

// // update/modify user info
// userSchema.methods.modifyInfo = function(info){
// 	// modify each field of the document
// };

module.exports = mongoose.model('User', userSchema);