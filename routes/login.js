var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login');
// router.get('/', checkNotLogin);

router.get('/', function(req, res){
	res.render('login',{
		title: 'Login',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', loginController);

// function checkNotLogin(req, res, next){
// 	if(req.session.user){
// 		req.flash('error', 'Already Login!');
// 		res.redirct('back');
// 	}
// 	next;
// }

module.exports = router;