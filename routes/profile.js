var express = require('express');
var router = express.Router();
var postController = require('../controllers/post');
var planController = require('../controllers/plan')

router.get('/', function(req, res){
	res.render('profile',{
		title: 'My Profile',
		user: req.session.user,
		owner: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.get('/edit', function(req, res){});
router.get('/following', function(req, res){});
router.get('/follower', function(req, res){});
router.get('/post', function(req, res){
	res.render('post',{
		title: 'Post a Travel Note',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/post', postController);
router.get('/plan', function(req, res){
	res.render('plan',{
		title: 'Post a Travel Plan',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/plan', planController);
module.exports = router;
