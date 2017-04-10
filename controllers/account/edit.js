var crypto = require('crypto');
var User = require('../../models/user.js');
module.exports = function(req, res){
  var username= req.body.name,
  old_password = req.body.password,
  password = req.body['password-repead'],
  password_re = req.body.email;
  if (password_re != password){
    req.flash('error', 'Inconsistent password!');
    return res.redirect('/signup');
  }
  if (username){
    User.findOne({username: username}, function(err, user){
      if (err){
        flash('error', err);
        return res.redirect('/');
      }
      if (user){
        flash('error', 'User already existed!');
        return res.status(403).json({
          success: "false",
          error: "User already existed"
        });
      }
    })
  }
  else{
    username=req.name;
  }
  if (!password){
    psssword=req.password;
  }
  res.name = username;
  res.password = password;
  flash('success', 'Successfully updata');
  res.redirect('/');
  callback(null, res);

}
