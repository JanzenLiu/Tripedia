var crypto = require('crypto');
var User = require('../../models/user.js');
module.exports = function(email, username, password, location, introduction, contact, callback){
  // if (password_re != password){
  //   req.flash('error', 'Inconsistent password!');
  //   return callback.redirect(req.originalUrl);
  // }
  // console.log(email);
  // console.log(username);
  // console.log(password);
  // console.log(location);
  // console.log(introduction);
  User.update({
    "email":email
    }, {
      $set: {
      username:username,
      password:password,
      introduction:introduction,
      location:location,
      contact: contact
      }
    }, function(err){
      if (err){
        // console.log('error', err);
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
