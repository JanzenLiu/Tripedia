var express = require('express');
var router = express.Router();
var City = require('../models/city')

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

// 
router.get('/', function(req, res){
	res.status(404).json({
		error: 'Page not found',
		success: false
	});
});

router.get('/:cityId', function(req, res){

	// check whether the user exists
	City.findById(req.params.cityId, function(err, city){
		if(err || !city){
			req.flash('error', 'City not found!');
			return res.status(500).json({
				error: 'City not found',
				success: false
			});
		}

		console.log(city);

		res.render('city',{
			title: city.name,
			user: req.session.user,
			city: city,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	})
})

module.exports = router;