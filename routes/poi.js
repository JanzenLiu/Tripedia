var express = require('express');
var Poi = require('../models/attraction');
var router = express.Router();

router.get('/:poiId', function(req, res){

	Poi.findById(req.params.poiId)
	   .populate("city", "name country path")
	   .exec(function(err, poi){
		if(err || !poi){
			req.flash('error', 'Attraction not found!');
			return res.status(500).json({
				error: 'Attraction not found',
				success: false
			});
		}

		console.log(poi);
		if (typeof(poi.location) != "undefined") {
			var citypos = poi.location.indexOf(poi.city.name);
			if (citypos != 0)
				poi.location = poi.location.substr(0, citypos) + "<br>" + poi.location.substr(citypos);
		}
		

		res.render('poi',{
			title: poi.name,
			user: req.session.user,
			poi: poi,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});

module.exports = router;