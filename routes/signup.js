var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signup');

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

router.post('/', signupController);

module.exports = router;