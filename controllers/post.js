var User = require('../models/user');
var Note = require('../models/travelnote');

module.exports = function(req, res){

	if(!req.session.user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}

	var authorId = req.session.user.uid,
		authorName = req.session.user.username, // to be modified
		title = req.body.title,
		text = req.body.text,

	var newPost = new Note({
		title: title,
		author: {
			uid: authorId,
			name: authorName
		},
		body: text,

		// calculate word_counts
		word_counts: 0,

		created_time: Date.now,
		updated_time: Date.now,
		pv: 0,
		like_counts: 0,
		comment_counts: 0,
	});

	newPost.save(function(err, post){
		if(err){
			req.flash('error', err);
			return res.redirect(req.originUrl);
		}

		User.findById(authorId, function(err, user){
			if(err){
				return res.status(500).json({ // to check status code
					error: 'server error while finding user',
					success: false
				});
			}

			// to move the validation outside the saving process
			if(!user){
				return res.status(500).json({
					error: 'User not found',
					success: false
				});
			}

			user.update({
				$push: {"travel_notes": {nid: mongoose.Types.ObjectId(post.nid)}},
				$inc: {travel_note_counts: 1}
			}).exec();
		});

		req.flash('success', 'Successfully Post Travel Note!');

		// where to redirect back?
		callbackURI = decodeURI(req.body.callback) || '/';
		res.redirect(callbackURI);
	});
}