var User = require('../models/user');
var Note = require('../models/travelnote');

module.exports = function(req, res){

	if(!req.session.user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}
	if(!req.body.nid){
		return res.status(500).json({ // to check status code
			error: 'nid for note not set',
			success: false
		});
	}

	var uid = req.session.user._id, // current user
		uname = req.session.user.username,
		nid = req.body.nid; // user to follow

	// to be modified...
	Note.findById(nid, function(err, note){
		if(err){
			return res.status(500).json({ // to check status code
				error: 'server error while finding note',
				success: false
			});
		}
		if(!note){
			return res.status(500).json({
				error: 'Note not found',
				success: false
			});
		}

		note.likedBy(uid, uname, function(err){
			if(err){
				return res.status(500).json({
					error: 'server error while updating like info',
					success: false
				});
			}
		});
	});
}