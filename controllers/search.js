var User = require('../models/user');
var Note = require('../models/travelnote');
var City = require('../models/city');
var Attraction = require('../models/attraction');

var searchByUser = function(key){};
var searchByNote = function(key){};
var searchByCity = function(key){};
var searchByAttraction = function(key){};

module.exports = function(req, res){
	var byUser = [],
		byNote = [],
		byCity = [],
		byAttraction = [];

	// manipulation...

	// will it work? JS is an asynchronized language...
	var results = {
		users: byUser,
		notes: byNote,
		cities: byCity,
		attractions: byAttraction
	};
	return results;
}