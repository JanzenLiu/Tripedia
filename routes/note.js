var express = require('express');
var Note = require('../models/travelnote');
var Spot = require('../models/attraction');
var router = express.Router();
var mongoose = require('mongoose');
var noteShow = require('../controllers/note/show');
var noteEdit = require('../controllers/note/edit')
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
		notes: noteList,
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

		console.log(note);

		res.render('note',{
			title: 'Single Note',
			user: req.session.user,
			note: note,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
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
