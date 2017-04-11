var mongoose = require('mongoose');

var City = require('../models/city');
var Poi = require('../models/attraction');
var db = require('../models/db');

// ============== add imageUrl to cities =================
// tmp = db.collection("tmp");

// tmp.find({},function(err, docs){
// 	if(err){
// 		console.log("Error!");
// 	}
// 	docs.forEach(function(doc){
// 		City.findOne({"path": doc.path},function(err, obj){
// 			if(err || !obj){
// 				console.log("Error!");
// 			}
// 			else{
// 				obj.imageUrl = doc.imageUrl;
// 				obj.save();
// 				console.log(obj.imageUrl);
// 			}
// 		});
// 	});
// });

// ================ join city with attractions ================
<<<<<<< HEAD
City.find({}, function(err, cities){

	if(err || !cities){
=======
Poi.find({}, function(err, poi){

	if(err || !poi){
>>>>>>> 8c12c3e8b0e7b233b9ff64093206f491f37f828c
		cosole.log(err);
		return;
	}

	successCount = 0;
	failureCount = 0;


<<<<<<< HEAD
	cities.forEach(function(city){

		pois = city["attractions"];
=======
	pois.forEach(function(poi){

		city = poi["cityName"];
>>>>>>> 8c12c3e8b0e7b233b9ff64093206f491f37f828c

		// pois.forEach(function(poi){
		// 	console.log(poi);
		// });

<<<<<<< HEAD
		pois.forEach(function(poi){

			// console.log(poi);

			poiName = poi.name;

			Poi.findOne({"name": poiName},function(err, doc){
=======
		city.forEach(function(city){

			// console.log(poi);

			cityName = city;

			City.findOne({"name": cityName},function(err, doc){
>>>>>>> 8c12c3e8b0e7b233b9ff64093206f491f37f828c

				// console.log("Finding", poiName, "in", city.name);

				if(err || !doc){

					failureCount++;
					// console.log(failureCount, "failure(s)");
				}
				else{

<<<<<<< HEAD
					poiId = doc._id;
					poi.aid = poiId;

					doc.update({$push:{"city": mongoose.Types.ObjectId(city._id)}}, function)(err){
=======
					cityId = doc._id;

					poi.update({$push: {"city": mongoose.Types.ObjectId(cityId)}}, function(err){
>>>>>>> 8c12c3e8b0e7b233b9ff64093206f491f37f828c
						if(err){
							console.log(err);
							return;
						}
<<<<<<< HEAD
						console.log(mongoose.Types.ObjectId(city._id));
					});
					docs.save();

					successCount++;
=======
						console.log(mongoose.Types.ObjectId(cityId));
					});

					poi.save()

					successCount++;
          console.log("Merging data ends");
        	return;
>>>>>>> 8c12c3e8b0e7b233b9ff64093206f491f37f828c

					// console.log(successCount, "success(es)");
				}
			});
		});
	});
<<<<<<< HEAD

	console.log("Merging data ends");
	return;
});
=======
});



// console.log("Program end");
>>>>>>> 8c12c3e8b0e7b233b9ff64093206f491f37f828c
