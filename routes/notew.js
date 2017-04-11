var express = require('express');
var router = express.Router();
var Spot = require('../models/attraction');

// router.get('/:username', function(req, res){
//
// 	// check whether the user exists
// 	User.findByUsername(req.params.username, function(err, user){
// 		if(!user){
// 			req.flash('error', 'User not found!');
// 			return res.status(500).json({
// 				error: 'User not found',
// 				success: false
// 			});
// 		}
//
// 		console.log(user);
//
// 		res.render('profile',{
// 			title: user.username + "'s Profile",
// 			user: req.session.user,
// 			owner: user,
// 			success: req.flash('success').toString(),
// 			error: req.flash('error').toString()
// 		});
// 	})
// })


router.get('/',function(req, res){

    res.render('notew',{
            title: "CUHK",
      			user: req.session.user,
      			success: req.flash('success').toString(),
      			error: req.flash('error').toString()
    });
})

module.exports = router;
