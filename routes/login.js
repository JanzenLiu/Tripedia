var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

// router.get('/', checkNotLogin);

router.get('/', function(req, res){
	res.render('login',{
		title: 'Login',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', function(req, res){

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
		console.log(user._id);
		req.flash('success', 'Successfully login!');
		res.redirect('/'); // redirect to homepage
	});
});

// function checkNotLogin(req, res, next){
// 	if(req.session.user){
// 		req.flash('error', 'Already Login!');
// 		res.redirct('back');
// 	}
// 	next;
// }

module.exports = router;