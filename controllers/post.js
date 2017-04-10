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

	var newPost = new Note({
		title: title,
		author: {
			uid: mongoose.Types.ObjectId(authorId),
			name: authorName
		},
		body: text,

		// calculate word_counts
		word_counts: 0,

		created_time: Date.now(),
		updated_time: Date.now(),
		pv: 0,
		like_counts: 0,
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
		callbackURI = decodeURI(req.body.callback) || '/';
		// res.redirect(callbackURI);
		return res.redirect('/');
	});
	newPost.search = function(keyword, callback) {
	  mongodb.open(function (err, db) {
	    if (err) {
	      return callback(err);
	    }
	    db.collection('posts', function (err, collection) {
	      if (err) {
	        mongodb.close();
	        return callback(err);
	      }
	      var pattern = new RegExp(keyword, "i");
	      collection.find({
	        "title": pattern
	      }, {
	        "name": 1,
	        "time": 1,
	        "title": 1
	      }).sort({
	        time: -1
	      }).toArray(function (err, docs) {
	        mongodb.close();
	        if (err) {
	         return callback(err);
	        }
	        callback(null, docs);
	      });
	    });
	  });
	};
}
