var crypto = require('crypto');
var User = require('../../models/user.js');

module.exports = function(req, res){

	var username = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'],
		email = req.body.email;

	if(password_re != password){
		req.flash('error', 'Inconsistent password!');
		return res.redirect('/signup');
	}

	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		username: username,
		password: password,
		email: email,
		// following_counts: 0,
		// follower_counts: 0,
		// travel_note_counts: 0
	});
	User.findOne({username: newUser.username}, function(err, user){
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		if(user){
			console.log(user);
			req.flash('error', 'User already existed!');
			return res.status(403).json({
				success: "false",
				error: "User already existed"
			});
		}
		newUser.save(function(err, user){
			if(err || !user){
				req.flash('error', err);
				return res.status(500).json({
					success: "false",
					error: "Save user error"
				});
			}
			req.session.user = user;
			req.flash('success', 'Successfully Signed up!');
			if (typeof(req.query.callback) == "undefined") {
				callbackURI = '/';
			} else {
				callbackURI = decodeURIComponent(req.query.callback) || '/';
			}
			res.redirect(callbackURI);
		});
	});
}
