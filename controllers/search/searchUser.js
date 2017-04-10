var User = require('../../models/user');

module.exports=function(keyword, callback){
  // Note.find({}, function(err, docs){
  // 	docs.forEach(function(doc){
  //
  // 	});
    var pattern = new RegExp(keyword, "i");
    Note.find({
      "name": pattern
    }).sort({
      time:-1
    }).toArray(function(err, docs){
      if (err){
        return callback(err);
      }
      callback(null, docs);
    });
    return callback(err);
}
