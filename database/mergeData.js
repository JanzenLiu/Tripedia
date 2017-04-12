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
City.find({}, function(err, cities){
	if(err || !cities){
		cosole.log(err);
		return;
	}
	successCount = 0;
	failureCount = 0;
	cities.forEach(function(city){
		pois = city["attractions"];

		// pois.forEach(function(poi){
		// 	console.log(poi);
		// });

		pois.forEach(function(poi){
			
			// console.log(poi);
			poiName = poi.name;
			Poi.findOne({"name": poiName},function(err, doc){

				// console.log("Finding", poiName, "in", city.name);

				if(err || !doc){
					failureCount++;
					// console.log(failureCount, "failure(s)");
				}
				else{

					poiId = doc._id;
					poi.aid = poiId;
					city.update({$push: {"pois": mongoose.Types.ObjectId(poiId)}}, function(err){
						if(err){
							console.log(err);
							return;
						}
						console.log(mongoose.Types.ObjectId(poiId));
					});
					city.save()
					successCount++;
					// console.log(successCount, "success(es)");
				}
			});
		});
	});

	console.log("Merging data ends");
	return;
});



// console.log("Program end");