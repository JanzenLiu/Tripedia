var crypto = require('crypto');
var Note = require('../../models/travelnote.js');
var mongoose = require('mongoose');
module.exports = function(title, body, citi1, citi2, citi3, spot1, spot2, spot3, callback){
  console.log(title);
  console.log(body);
      Note.update({
        "title": title
      }, {
        $set: {body: body},
        $set: {cities:[citi1, citi2, citi3]},
        $set: {attractions:[spot1, spot2, spot3]}
      }, function (err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
      return callback('/');

}
