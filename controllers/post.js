var User = require('../models/user');
var Note = require('../models/travelnote');
var mongoose = require('mongoose');

module.exports = function(req, res){

	if(!req.session.user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}
	var authorId = req.session.user._id,
		authorName = req.session.user.username, // to be modified
		title = req.body.title,
		text = req.body.text;
		citi1=req.body.citi1;
		citi2=req.body.citi2;
		citi3=req.body.citi3;
		spot1=req.body.attraction1;
		spot2=req.body.attraction2;
		spot3=req.body.attraction3;
		if (!citi1){citi1='Citi 1'};
		if (!citi2){citi2='Citi 2'};
		if (!citi3){citi3='Citi 3'};
		if (!spot1){spot1='Attraction 1'};
		if (!spot2){spot2='Attraction 2'};
		if (!spot3){spot3='Attraction 3'};
		console.log(citi3);
		console.log(spot2);
	var newPost = new Note({
		title: title,
		author: {
			uid: mongoose.Types.ObjectId(authorId),
			name: authorName
		},
		body: text,

		// calculate word_counts
		word_counts: 0,
		cities:[citi1, citi2, citi3],
		attractions:[spot1, spot2, spot3],
		created_time: Date.now(),
		updated_time: Date.now(),
		pv: 0,
		like_counts: 0,
		dislike_counts: 0,
		comment_counts: 0,
	});

	newPost.save(function(err, post){
		if(err){
			req.flash('error', err);
			return res.status('500').json({
				error: err,
				success : false
			});
			// return res.redirect(req.originUrl);
		}


		// to make sure
		User.update({_id: mongoose.Types.ObjectId(authorId)},{
			$push: {"travel_notes": post._id},
			$inc: {travel_note_counts: 1}
		},function(err, numAffected){
			if(err){
				return res.status('500').json({
					error: err,
					success : false
				});
			}

			// to add something...
			// to check whether the list for travel notes is updated
		})

		req.flash('success', 'Successfully Post Travel Note!');

		// where to redirect back?
		// res.redirect(callbackURI);
		return res.redirect('/note');
	});
}
