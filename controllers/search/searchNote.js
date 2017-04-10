var Note = require('../../models/travelnote');
var searchByUser = function(key){};
var searchByNote = function(key){};
var searchByCity = function(key){};
var searchByAttraction = function(key){};

module.exports=function(keyword, callback){
  Note.find({}, function(err, docs){
  	docs.forEach(function(doc){
  		  if (keyword==docs.name){
          callback(null, doc);
        }
  	});
    return callback(err);
  });
}
