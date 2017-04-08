var express = require('express');
var router = express.Router();

var city = {};
// {
// 	name: "Beijing",
// 	pois: [{
// 		name: "Tian An Men",
// 		imageUrl: "#",
// 		brief: "xxxx",
// 		description: "yyyyyyyyy"
// 	},{
// 		name: "The Forbidden City",
// 		imageUrl: "#",
// 		brief: "xxxx",
// 		description: "yyyyyyyyy"
// 	},{
// 		name: "The Great Wall",
// 		imageUrl: "#",
// 		brief: "xxxx",
// 		description: "yyyyyyyyy"
// 	}]
// };

router.get('/', function(req, res){
	res.render('city', {
		title: 'City',
		city: city,
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

module.exports = router;