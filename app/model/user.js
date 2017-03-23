var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Schema for User ========================
var userSchema = mongoose.Schema({
	username			: String,
	password			: String,
	name				: String,
	gender				: String, // "M" for male, "F" for female...
	following_counts	: Integer,
	follower_counts		: Integer,
	travel_note_counts	: Integer,

	// travel notes collection: add more fields for conveniece?
	travel_notes_id		:[Schema.Types.ObjectId]; // type declaration correct?

	// to be supplement
	// email
});

// methods ================================
// generating a hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check the validation of the password
userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.local.password;
};

// update/modify user info
userSchema.methods.modifyInfo = function(info){
	// modify each field of the document
};

module.exports = mongoose.model('User', userSchema);