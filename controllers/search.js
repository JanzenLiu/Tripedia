var User = require('../models/user');
var Note = require('../models/travelnote');
var City = require('../models/city');
var Attraction = require('../models/attraction');
var db=require('../models/db');
var searchByUser = function(key){};
var searchByNote = function(key){};
var searchByCity = function(key){};
var searchByAttraction = function(key){};

// module.exports = function(keyword, callback) {
//     db.collection('posts', function (err, collection) {
//       if (err) {
//         return callback(err);
//       }
//       var pattern = new RegExp(keyword, "i");
//       collection.find({
//         "title": pattern
//       }, {
//         "name": 1,
//         "time": 1,
//         "title": 1
//       }).sort({
//         time: -1
//       }).toArray(function (err, docs) {
//         mongodb.close();
//         if (err) {
//          return callback(err);
//         }
//         callback(null, docs);
//       });
//   });
// };
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
