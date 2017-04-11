var mongoose = require('mongoose');
var Connection = require('./db');

// Schema for User ========================
var planSchema = new mongoose.Schema({
  title: String,
  brief: String,
  days: [{
    index: Number,
    ref: "pois",
    body: String
  }],
  dayCounts: Number
	//////////////////// to be supplement //////////////////////
	// email
});

// methods ================================

userSchema.statics.findById = function(id, cb){
	return this.findOne({_id: mongoose.Types.ObjectId(id)}, cb);
};

userSchema.statics.findByUsername = function(name, cb){
	return this.findOne({username: name}, cb);
};

// check whether the previous user is following the latter user
userSchema.statics.isFollowing = function(followerId, followeeId, cb){

	// return null if follower is not following the followee, return the follower if he/she otherwise
	return this.findOne({
		_id: mongoose.Types.ObjectId(followerId),
		'followings': {
			$elemMatch: {'uid': mongoose.Types.ObjectId(followeeId)}
		}
	}, cb);
};

userSchema.methods.follow = function(id, cb){
	// check whether the user with id hasn't been followed by the current user

	return this.update({
		$push: {"followings": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {"following_counts": 1}
	}).exec();
}

userSchema.methods.followedBy = function(id, cb){
	// check whether the user with id hasn't followed by the current user

	return this.update({
		$push: {"followers": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {"follower_counts": 1}
	}).exec();
}

userSchema.methods.unfollow = function(id, cb){
	return this.update({
		// check whether the user with id is followed by the current user

		$pop: {"followings": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {"following_counts": -1}
	}).exec();
}

userSchema.methods.unfollowedBy = function(id, cb){
	return this.update({
		// check whether the user with id is following the current user

		$pop: {"followers": {uid: mongoose.Types.ObjectId(id)}},
		$inc: {"follower_counts": -1}
	}).exec();
}

userSchema.methods.updateInfo = function(info, cb){
	return this.update({
		$set: {
			// validate the parameter object info first...

			"name": info.name,
			"gender": info.gender,
			"location": info.location
		}
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
