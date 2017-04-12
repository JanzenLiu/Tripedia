var crypto = require('crypto');
var Note = require('../../models/travelnote.js');
var mongoose = require('mongoose');
module.exports = function(callback){
  Note.find().limit(10).exec(function(err,doc){
    callback(null, doc);
  });
}
