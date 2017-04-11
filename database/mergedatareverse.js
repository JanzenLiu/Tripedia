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
Poi.find({}, function(err, poi){

	if(err || !poi){
		cosole.log(err);
		return;
	}

	successCount = 0;
	failureCount = 0;


	pois.forEach(function(poi){

		city = poi["cityName"];

		// pois.forEach(function(poi){
		// 	console.log(poi);
		// });

		city.forEach(function(city){

			// console.log(poi);

			cityName = city;

			City.findOne({"name": cityName},function(err, doc){

				// console.log("Finding", poiName, "in", city.name);

				if(err || !doc){

					failureCount++;
					// console.log(failureCount, "failure(s)");
				}
				else{

					cityId = doc._id;

					poi.update({$push: {"city": mongoose.Types.ObjectId(cityId)}}, function(err){
						if(err){
							console.log(err);
							return;
						}
						console.log(mongoose.Types.ObjectId(cityId));
					});

					poi.save()

					successCount++;
          console.log("Merging data ends");
        	return;

					// console.log(successCount, "success(es)");
				}
			});
		});
	});
});



// console.log("Program end");
