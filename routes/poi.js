var express = require('express');
var Poi = require('../models/attraction');
var router = express.Router();

router.get('/:poiId', function(req, res){

	Poi.findById(req.params.poiId, function(err, poi){
		if(err || !poi){
			req.flash('error', 'Attraction not found!');
			return res.status(500).json({
				error: 'Attraction not found',
				success: false
			});
		}

		console.log(poi);

		res.render('city',{
			title: poi.name,
			user: req.session.user,
			city: poi,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});

module.exports = router;