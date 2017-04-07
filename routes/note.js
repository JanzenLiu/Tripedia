var express = require('express');
var note = require('../models/travelnote');
var router = express.Router();

var noteList;

router.get('/', function(req, res){
	res.render('note', {
		title: 'Travel Notes',
		user: req.session.user,
		notes: noteList;
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

module.exports = router;