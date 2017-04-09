var City = require('../models/city');

var newCity = new City({
	name: "Atlantis",
	country: "The Lost Realm",
	path: "0",
	attractions: [],
    intro: "Atlantis is a fictional island mentioned within an allegory on the hubris of nations in Plato's works Timaeus and Critias, where it represents the antagonist naval power that besieges 'Ancient Athens', the pseudo-historic embodiment of Plato's ideal state (see The Republic).",
    description: {
    	subtitles: [],
    	bodies: []
    }
});

newCity.save(function(err, city){
	if(err || !city){
		console.log(err);
	}
	console.log("Successfully created city");
	console.log(city);
});
