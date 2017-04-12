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
// var cuhk = new Spot({
//     name: "CUHK",
//     city: {
//         name: "Hong Kong"
//     },
//     introduction: "A Nightmare",
//     position: {
//         longtitude: "22.3 N",
//         langtitude: "66.6 E"
//     },
//     transport: {
//         rough: "Bus",
//         detail: "Go go go"
//     },
//     travelTime: "2 hours",
//     ticket: "Infinity!!!!!!!!!",
//     openTime: "All day"
// });

router.get('/',function(req, res){

    res.render('spot',{
            title: "CUHK",
      			user: req.session.user,
      			spot: cuhk,
      			success: req.flash('success').toString(),
      			error: req.flash('error').toString()
    });
})

module.exports = router;
