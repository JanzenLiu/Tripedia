var City = require('../models/city');
var db = require('../models/db');

tmp = db.collection("tmp");

tmp.find({},function(err, docs){
	if(err){
		console.log("Error!");
	}
	docs.forEach(function(doc){
		City.findOne({"path": doc.path},function(err, obj){
			if(err || !obj){
				console.log("Error!");
			}
			else{
				obj.imageUrl = doc.imageUrl;
				obj.save();
				console.log(obj.imageUrl);
			}
		});
	});
});

console.log("Program end");