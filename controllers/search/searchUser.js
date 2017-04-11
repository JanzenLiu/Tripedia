var User = require('../../models/user');

module.exports=function(keyword, callback){
  // Note.find({}, function(err, docs){
  // 	docs.forEach(function(doc){
  //
  // 	});
    var pattern = new RegExp(keyword, "i");
    User.find({
      "username": pattern
    },{
      "username":1,
      "password":1,
      "name":1,
      "gender":1,
      "location":1
    },function(err, docs){
      if (err){
        return callback(err);
      }
      console.log(docs);
      callback(null, docs);
    });
}
