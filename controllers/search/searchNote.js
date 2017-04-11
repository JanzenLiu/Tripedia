var Note = require('../../models/travelnote');


module.exports = function(keyword, callback){
  // Note.find({}, function(err, docs){
  // 	docs.forEach(function(doc){
  //
  // 	});
    var pattern = new RegExp(keyword, "i");
    Note.find({
        "title": pattern
      },{
        "name":1,
        "body":1,
        "title":1,
      },function(err, docs){
        if(err){
          console.log(err);
        }
        docs.forEach(function(doc){
          console.log(doc);
        });

        console.log(docs);
        callback(null, docs);
      });


}
