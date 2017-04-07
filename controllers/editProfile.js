var User = require('../models/user.js');


var info = {
	name: req.body.name,
	gender: req.body.gender,
	location: req.body.location
};

module.exports = function(req. res){
	if(!req.session.user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}
	if(!req.body.uid){
		return res.status(500).json({ // to check status code
			error: 'uid not set',
			success: false
		});
	}

	uid = req.session.user.uid;

	User.findById(uid, function(err, user){
		if(err){
			return res.status(500).json({ // to check status code
				error: 'server error while finding current user',
				success: false
			});
		}
		if(!user){
			return res.status(500).json({
				error: 'User not found',
				success: false
			});
		}

		// check whether one document was modified
		user.updateInfo(info, function(err){
			if(err){
				return res.status(500).json({
					error: 'Server error while updating user info',
					success: false
				});
			}
		});
	});
}