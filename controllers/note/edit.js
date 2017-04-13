var crypto = require('crypto');
var Note = require('../../models/travelnote');
var mongoose = require('mongoose');
module.exports = function(title, body, citi1, citi2, citi3, spot1, spot2, spot3, callback){
      Note.update({
        "title": title
      }, {
        $set: {body: body,
        cities:[citi1, citi2, citi3],
        attractions:[spot1, spot2, spot3]}
      }, function (err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
      return callback('/');

}
