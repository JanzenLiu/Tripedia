var express = require('express');
var Note = require('../models/travelnote');
var Spot = require('../models/attraction');
var router = express.Router();
var mongoose = require('mongoose');
var noteShow = require('../controllers/note/show');
var noteEdit = require('../controllers/note/edit');
var noteComment = require('../controllers/note/notecomment');
var noteLike=require('../controllers/note/like');
var noteShowList=require('../controllers/note/showlist');
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
	noteShowList(function(err, noteList){
		res.render('notes', {
			title: 'Travel Notes',
			user: req.session.user,
			noteList: noteList,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
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
			Note.findOne({
				"title":req.params.title
			},function(err, note){
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
	var currentUser = req.session.user,
	citi1=req.body.citi1,
	citi2=req.body.citi2,
	citi3=req.body.citi3,
	spot1=req.body.attraction1,
	spot2=req.body.attraction2,
	spot3=req.body.attraction3;
	if(!citi1){citi1='Citi 1'}
	if(!citi2){citi2='Citi 2'}
	if(!citi3){citi3='Citi 3'}
	if(!spot1){spot1='Attraction 1'}
	if(!spot2){spot2='Attraction 2'}
	if(!spot3){spot3='Attraction 3'}
	noteEdit(req.params.title, req.body.post, citi1, citi2, citi3, spot1, spot2, spot3, function(err){
		if (err){
			req.flash('error', err);
			url='/note/'+req.params.title+'/edit';
			return res.redirect(url);
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
