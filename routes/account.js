var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var signup = require('../controllers/account/signup');
var login = require('../controllers/account/login');
var logout = require('../controllers/account/logout');
var edit = require('../controllers/account/edit');
// login
router.get('/login', function(req, res){
	res.render('login',{
		title: 'Login',
		page: 'login',
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
		page: 'signup',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/signup', signup);
// logout
router.get('/logout', logout);
//edit
router.get('/edit', function(req,res){
	var user = req.session.user;
	
	edit(req.session.user, function(err, user){
		if (err){
			req.flash('error', err);
			return res.redirect('/');
		}
		console.log(user);
	});
	res.render('edit',{
		title: 'Edit',
		page: 'Edit',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/edit', edit);
module.exports = router;
