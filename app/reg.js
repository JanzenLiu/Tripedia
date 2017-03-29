// import modules
var flash = require('connect-flash');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function(req, res, db){
	// reg.ejs form not unified yet
	var name = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'];
	// check the consistency of two passwords input
	if (password_re != password){
		req.flash('error', 'Inconsistent Password!') // to modify the warning information
		return res.redirect('/reg'); // individual page for /reg not exist yet
	}
	// generate md5 value of the password
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password.digest('hex'));
	// check the existence of the user
}