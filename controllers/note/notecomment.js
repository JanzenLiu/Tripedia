var User = require('../../models/user');
var Note = require('../../models/travelnote');
var noteComment = require('../../models/notecomment');

module.exports = function(note, user, text, callback){
	if(!user){
		return res.status(403).json({
			error: 'Illegal operation: not login!',
			success : false
		});
	}
	var authorId = user._id,
	authorName=user.username,
	noteId=note._id;
	// console.log('=====');
	// console.log(authorId);
	// console.log(authorName);
	// console.log(noteId);
	// console.log('====');
	var newComment = new noteComment({
		note: {nid: noteId},
		author: {uid: authorId, name:authorName},
		content: text
	});
	console.log(newComment);
	// to move this part to the travelnote model?
	newComment.save(function(err, notecomment){
		if(err){
			return callback('/');
		}
		// Note.findById(noteId, function(err, note){
		// 	if(err){
		// 		return res.status(500).json({ // to check status code
		// 			error: 'server error while finding travel note',
		// 			success: false
		// 		});
		// 	}
		//
		// 	// to move the validation outside the saving process
		// 	if(!note){
		// 		return res.status(500).json({
		// 			error: 'Travel note not found',
		// 			success: false
		// 		});
		// 	}
			Note.update({
				"title":note.title
			},{
				$push: {"comments": notecomment._id},
				$inc: {"comment_counts": 1}
			},function(err){
			callback(null);
		});
		});


		// where to redirect back?


}
