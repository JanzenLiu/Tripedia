var express = require('express');
var Note = require('../models/travelnote');
var Spot = require('../models/attraction');
var router = express.Router();
var mongoose = require('mongoose');
var noteShow = require('../controllers/note/show');
var noteEdit = require('../controllers/note/edit');
var noteComment = require('../controllers/note/notecomment');
var noteLike=require('../controllers/note/like');
var title;
// return notes with highest heat

// var cur_note =	new Note({
// 		title: "Duang",
// 		tid: mongoose.Types.ObjectId(),
// 		author:{
// 			name: "zhangsibin"
// 		},
// 		brief: "a good experience to travel at duang",
// 		body: "happy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsdahappy enoughdsfsadfsda",
// 		word_counts: 1000,
// 		like_counts: 10,
// 		city:{
// 			name:"Beijing",
// 			country:
// 			path:"Beijing"
// 		}
// 	});
// cur_note.save();
// var noteList = [cur_note];

router.get('/', function(req, res){
	res.render('notes', {
		title: 'Travel Notes',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.get('/:noteId', function(req, res){
	// check whether the user exists
	Note.findById(req.params.noteId, function(err, note){
		if(err || !note){
			req.flash('error', 'Note not found!');
			return res.status(500).json({
				error: 'Note not found',
				success: false
			});
		}
		title=note.title;
		console.log(note);
		// comment=note.comment();
		res.render('note',{
			title: title,
			user: req.session.user,
			note: note,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	}).populate('comments');
});
// post.get('/:noteId/comment', function(req,res){
// 			Note.findById(req.params.noteId, function(err, note){
// 				if (err || !note){
// 					req.flash('error', 'Note note found');
// 					return res.status(500).json({
// 						error: 'Note not found',
// 						success:false
// 					});
// 				}
// 				var userId=req.session.user._id;
// 				var noteTitle=note.title;
// 				var	comment=req.body.comment;
// 				noteComment(req.params.noteID, userId, function(err){
//
// 				})s
// 			})
// })
router.post('/comment', function(req, res){
	Note.findOne({
		"title":title
	},{
		"title":1,
		"_id":1,
		"comments": 1,
		"comment_counts": 1
	},function(err, note){
		if (err){
			req.flash('error',err);
			return res.status(403).json({
				error:'Illegal operation: no note!',
				success:false
			});
		}
		noteComment(note, req.session.user, req.body.text, function(err){
			if (err){
				console.log('error in notecomment');
				return res.redirect('/');
			}
		});
	});
});
router.post('/like', function(req, res){
		Note.findOne({
			"title":title
		},{
			"title":1,
			"_id":1,
			"comments":1,
			"comment_counts":1
		},function(err, note){
			if (err){
				req.flash('error',err);
				return res.status(403).json({
					error:'Illegal operation: no note!',
					success:false
				});
			}
			noteLike(note, req.session.user, req.body.text, 1, function(err){
				if(err){
					console.log('error in rating');
					return res.redirect('/');
				}
			});
		});
});
router.post('/dislike', function(req, res){
	Note.findOne({
		"title":title
	},{
		"title":1,
		"_id":1,
		"comments":1,
		"comment_counts":1
	},function(err, note){
		if (err){
			req.flash('error', err);
			return res.status(403).json({
				error:'Illegal operation: no note!',
				success:false
			});
		}
		noteLike(note, req.session.user, req.body.tesxt, 0, function(err){
			if(err){
				console.log('error in ratint');
				return res.redirect('/');
			}
		});
	});
});
router.get('/:title/edit', function(req, res){
	// Note.findById(req.params.noteId, function(err, note){
	// 	if (err || !note){
	// 		req.flash('error', 'Note not found!');
	// 		return res.status(500).json({
	// 			error: 'Note not found',
	// 			success: false
	// 		});
	// 	}
	// 	var currentUser = req.session.user;
		noteShow(req.params.title, function(err, note){
			if (err){
				req.flash('error', err);
				return res.redirect('back');
			}
			res.render('editNote',{
			title: 'View Note',
			user: req.session.user,
			note: note,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	// });
});
router.post('/:title/edit', function(req, res){
	var currentUser = req.session.user;
	noteEdit(req.params.title, req.body.post, function(err){
		if (err){
			req.flash('error', err);
			return res.redirect('/');
		}
	});
});
// router.get('/:noteID/edit', function(req, res){
// 	Note.findById(req.params.noteId, function(err, note){
// 		if (err || !note){
// 			req.flash('error', 'Note not found!');
// 			return res.status(500).json({
// 				error: 'Note not found',
// 				success: false
// 			});
// 		}
// 	});
// 	res.render('editnote'{
// 		title: 'Edit Note',
// 		user: req.session.user,
// 		note: note,
// 		success: req.flash('success').toString(),
// 		error: req.flash('error').toString()
// 	})
// });
module.exports = router;
