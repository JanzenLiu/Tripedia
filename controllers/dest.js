var City = require('../models/city');
var mongoose = require('mongoose');

module.exports = function(req, res){
    City.findRandom({imageUrl: { $ne: null }}, {}, {limit: 5}, function(err, city){
        if(err || !city){
            req.flash('error', 'City not found!');
            return res.status(500).json({
                error: 'City not found',
                success: false
            });
        }

        res.render('dest',{
            title: 'Destinations',
            user: req.session.user,
            cities: city
        });
    });

}
