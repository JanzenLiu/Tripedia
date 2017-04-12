var City = require('../../models/city');


module.exports=function(keyword, callback){
  // Note.find({}, function(err, docs){
  // 	docs.forEach(function(doc){
  //
  // 	});
    var pattern = new RegExp(keyword, "i");
    City.find({
      "name": pattern
    },{
      "name":1,
      "body":1,
      "country":1,
      "_id":1,
      "intro":1
    },function(err, docs){
      if (err){
        return callback(err);
      }
      docs.forEach(function(doc){
        console.log(doc);
      });
      callback(null, docs);
    });
}
