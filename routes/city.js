var express = require('express');
var router = express.Router();
var City = require('../models/city')

// router.get('/', function(req, res){
// 	res.status(404).json({
// 		error: 'Page not found',
// 		success: false
// 	});
// });

router.get('/:pathname', function(req, res){

	City.findOne({path: req.params.pathname}, function(err, city){
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
	}).populate("pois");
});

router.get('/:country/:city', function(req, res){

	// check whether the user exists
	country = req.params.country;
	city = req.params.city;

	var pathname = [country, city].join("/");
	City.findOne({path: pathname}, function(err, city){
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
	}).populate("pois");
});

router.get('/:country/:area/:city', function(req, res){

	// check whether the user exists
	country = req.params.country;
	area = req.params.area;
	city = req.params.city;

	var pathname = [country, area, city].join("/");
	City.findOne({path: pathname}, function(err, city){
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
	});
});

module.exports = router;