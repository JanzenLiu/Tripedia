var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

// app.get('/', checkNotLogin);

router.get('/', function(req, res){
	res.render('signup',{
		title: 'Signup',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

// app.post('/', checkNotLogin);

router.post('/', function(req, res){
	var username = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'];

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
	});
})

module.exports = router;