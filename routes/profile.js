var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('profile',{
		title: 'My Profile',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.get('/edit', function(req, res){});
router.get('/following', function(req, res){});
router.get('/follower', function(req, res){});
router.get('/post', function(req, res){});
router.post('/post', function(req, res){});

module.exports = router;