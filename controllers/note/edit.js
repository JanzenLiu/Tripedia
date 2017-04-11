var crypto = require('crypto');
var Note = require('../../models/travelnote.js');
var mongoose = require('mongoose');
module.exports = function(title, body, callback){
  console.log(title);
  console.log(body);
      Note.update({
        "title": title
      }, {
        $set: {body: body}
      }, function (err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
      return callback('/');

}
