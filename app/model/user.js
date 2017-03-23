var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// schema ========================
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
});

// methods =======================
// generating a hash
userSchema.methods.generateHash; // use bcrypt.hashSync()?

// check if the password is valid
userSchema.methods.validatePassword; // use bcrypt.compareSync()? use this.local.password to get the stored password?

// update the user_

module.exports = mongoose.model('User', userSchema);