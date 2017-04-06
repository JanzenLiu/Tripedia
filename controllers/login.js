var crypto = require('crypto');
var User = require('../models/user.js');

module.exports = function(req, res){

	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');

	// check whether the user has already existed
	User.findOne({username: req.body.name}, function(err, user){
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		if(!user){
			req.flash('error', 'User does not exist!');
			return res.redirect('/login');
		}
		// check whether the passwords match
		if(user.password != password){
			req.flash('error', 'Password invalid!');
			return res.redirect('/login');
		}

		req.session.user = user;
		req.flash('success', 'Successfully login!');
		res.redirect('/'); // redirect to homepage
	});
}