var User = require('../models/user');
var Note = require('../models/travelnote');
var Comment = require('../models/comment');

module.exports = function(req, res){

	if(!req.session.user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}

	var authorId = req.session.user.uid,
		noteId = req.body.nid,
		text = req.body.text

	var newComment = new Note({
		note: {nid: noteId},
		author: {uid: authorId},
		content: text,
		created_time: Date.now
	});

	newComment.save(function(err, comment){
		if(err){
			req.flash('error', err);
			return res.redirect(req.originUrl);
		}

		Note.findById(noteId, function(err, note){
			if(err){
				return res.status(500).json({ // to check status code
					error: 'server error while finding travel note',
					success: false
				});
			}

			// to move the validation outside the saving process
			if(!note){
				return res.status(500).json({
					error: 'Travel note not found',
					success: false
				});
			}

			note.update({
				$push: {"comments": comment._id},
				$inc: {comment_counts: 1}
			}).exec();
		});

		req.flash('success', 'Successfully Post Comment!');

		// where to redirect back?
		callbackURI = decodeURI(req.body.callback) || '/';
		res.redirect(callbackURI);
	});
}