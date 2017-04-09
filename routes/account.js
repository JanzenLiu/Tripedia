var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var signup = require('../controllers/account/signup');
var login = require('../controllers/account/login');
var logout = require('../controllers/account/logout');

// login
router.get('/login', function(req, res){
	res.render('login',{
		title: 'Login',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/login', login);
// signup
router.get('/signup', function(req, res){
	res.render('signup',{
		title: 'Signup',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/signup', signup);
// logout
router.get('/logout', logout);

module.exports = router;