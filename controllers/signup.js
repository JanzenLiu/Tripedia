var crypto = require('crypto');
var User = require('../models/user.js');

module.exports = function(req, res){

	console.log("Enter controller");

	var username = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'],
		email = req.body.email;

	if(password_re != password){
		req.flash('error', 'Inconsistent password!');
		return res.redirect('/signup');
	}

	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		username: username,
		password: password,
		email: email
	});
	User.findOne({username: newUser.username}, function(err, user){
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		if(user){
			req.flash('error', 'User already existed!');
			return res.redirect('/signup');
		}
		newUser.save(function(err, user){
			if(err){
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = user;
			req.flash('success', 'Successfully Signed up!');
			res.redirect('/');
		});
	});	
}