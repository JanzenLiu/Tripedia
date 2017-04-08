var express = require('express');
var Note = require('../models/travelnote');
var router = express.Router();

// return notes with highest heat
var noteList = [];

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
			user: req.session.user,
			note: note,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	})
})

module.exports = router;