var User = require('../../models/user');
var Note = require('../../models/travelnote');
var noteComment = require('../../models/notecomment');

module.exports = function(note, user, text, like, callback){
	// if(!user){
	// 	return res.status(403).json({
	// 		error: 'Illegal operation: not login!',
	// 		success : false
	// 	});
	// }
	// if (!user){
	// 	return callback('/note');
	// }
	var authorId = user._id,
	authorName=user.username,
	noteId=note._id;

	// to move this part to the travelnote model?

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
    if (like== 1){
			Note.update({
				"title":note.title
			},{
				$push: {"likes": authorId},
				$inc: {"like_counts": 1}
			},function(err){
			callback(null);
		});
  }
  else {
    console.log('sdfsafsad');
      Note.update({
        "title":note.title
      },{
        $push: {"dislikes": authorId},
        $inc: {"dislike_counts":1}
      },function(err){
        callback(null);
      });
  }
}
