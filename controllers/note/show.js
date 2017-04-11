var crypto = require('crypto');
var Note = require('../../models/travelnote.js');
var mongoose = require('mongoose');

module.exports=function(title, callback){
  Note.findOne({
    "title": title
  },{
    "title":1,
    "body":1
  },function(err, docs){
    if (err){
      return callback(err);
    }
    console.log(docs);
    callback(null, docs);
  });
}
