var crypto = require('crypto');
var User = require('../../models/user.js');
module.exports = function(username, password, email, callback){
  // if (password_re != password){
  //   req.flash('error', 'Inconsistent password!');
  //   return callback.redirect(req.originalUrl);
  // }
  var user = new User();
  User.update({
    "email":email
    }, {
      $set: {username: username}
    }, function(err){
      if (err){
        return callback(err);
      }
      callback(null);
    });
  //   // req.flash('success', 'Successfully Signed up!');
    //
    // if (typeof(req.query.callback) == "undefined") {
    //   callbackURI = '/';
    // } else {
    //   callbackURI = decodeURIComponent(req.query.callback) || '/';
    // }
    // res.redirect(callbackURI);
}
