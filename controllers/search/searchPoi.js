var poi = require('../../models/attraction');


module.exports=function(keyword, callback){
  // Note.find({}, function(err, docs){
  // 	docs.forEach(function(doc){
  //
  // 	});
    var pattern = new RegExp(keyword, "i");
    poi.find({
      "name": pattern
    },{
      "name":1,
      "introduction":1,
      "ticket":1,
      "openTime":1
    },function(err, docs){
      if (err){
        return callback(err);
      }
      docs.forEach(function(doc){
        console.log(doc);
      });
      console.log(docs);
      callback(null, docs);
    });
}
