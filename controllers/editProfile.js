var User = require('../models/user.js');

module.exports = function(req. res){
	if(!req.session.user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}
	if(!req.body.uid){
		return res.status(500).json({ // to check status code
			error: 'uid for followee not set',
			success: false
		});
	}

	uid = req.session.user.uid;
	

	User.findById(followee_id, function(err, user){
		if(err){
			return res.status(500).json({ // to check status code
				error: 'server error while finding followee',
				success: false
			});
		}
		if(!user){
			return res.status(500).json({
				error: 'Followee not found',
				success: false
			});
		}

		// check whether one document was modified
		user.followedBy(uid, function(err){
			if(err){
				return res.status(500).json({
					error: 'Server error while updating followee info',
					success: false
				});
			}
		});
	});

	User.findById(uid, function(err, user){
		if(err){
			return res.status(500).json({ // to check status code
				error: 'Server error while finding current user',
				success: false
			});
		}
		if(!user){
			return res.status(500).json({
				error: 'Current user not found',
				success: false
			});
		}

		// check whether one document was modified
		user.follow(uid, function(err){
			if(err){
				return res.status(500).json({
					error: 'server error while updating following info',
					success: false
				});
			}
		});
	});
}