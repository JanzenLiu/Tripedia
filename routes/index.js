module.exports = function(app){

	/*
	/: Homepage
	/login: user login
	/reg: user register
	/dest: Entry for destinations
	/city/[cid]: City page
	/poi/[aid]: Attraction page
	/note: Entry for travel notes
	/note/[uid]: User travel notes page
	/note/[nid]: Single travel note page
	/user/uid : (Other) user page
	/profile: Personal profile page
	/post: Post a travel note
	/logout: user logout

		*/
	app.get('/', function(req, res){
		res.render('index', {title: 'Homepage'});
	});

	// How to combine login and reg in one single page
	app.get('/login', function(req, res){
		res.render('login', {title: 'Login'});
	});
	app.post('/login', function(req, res){
	});
	app.get('/reg', function(req, res){
		res.render('reg', {title: 'Register'});
	});
	app.post('/reg', function(req, res){
	});

	app.get('/dest', function(req, res){
		res.render('dest', {title: 'Destinations'});
	});
	// City, Poi ...
	app.use('/city', require('./city'));
	app.use('/poi', require('./poi'));

	app.get('/note', function(req, res){
		res.render('note', {title: 'Travel Notes'});
	});
	// Single travel notes...
	// User
	app.use('/user', require('./user'));

	app.get('/profile', function(req, res){			// add validation
		res.render('profile', {title: 'Profile'});
	});

	app.get('/post', function(req, res){
		res.render('post', {title: 'Post a Travel Note'});
	});
	app.post('/', function(req, res){
	});
	
	app.get('/logout', function(req, res){
	});

	// 404 Page
};

// var express = require('express');
// var router = express.Router();

// // Homepage ==============
// router.get('/',function(req, res){
// 	res.render('index', {title: 'Express'});
// });

// module.exports = router;