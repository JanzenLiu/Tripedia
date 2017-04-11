var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var signup = require('../controllers/account/signup');
var login = require('../controllers/account/login');
var logout = require('../controllers/account/logout');
var edit = require('../controllers/account/edit');
var username, password;
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
	username = req.session.user.username;
	password = req.session.user.password;
	res.render('edit',{
		title: 'Edit',
		page: 'Edit',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/edit', function(req,res){
	var password = req.body.password;
	var username = req.body.name;
	var introduction = req.body.introduction;
	var location = req.body.location;
	var email=req.session.user.email;
	edit(email, username, password, location, introduction, function(err){
		if (err) {
      req.flash('error', err);
      return res.redirect('/account/edit');
    }
		req.session.user.username=username;
		req.session.user.password=password;
		req.session.user.introduction=introduction;
		req.session.user.location=location;
		req.flash('success');
		res.redirect('/');
	});
});
module.exports = router;
