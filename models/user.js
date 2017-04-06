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
	travel_notes_id		:[{
		nid 	: mongoose.Schema.Types.ObjectId, // type declaration correct?
		title 	: String
	}]

	//////////////////// to be supplement //////////////////////
	// email
});

// methods ================================
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