var User = require('../../models/user');
var Plan = require('../../models/plan');
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
		dayNo = req.params.dayNo,
		text = req.body.text;
		console.log(title);
		console.log(dayNo);
		console.log(text);
		if (text){
		Plan.update({
			"title":title
		},{$push: {days:text}},
		function(err){
			if (err){
				return res.status(500).json({
					error:err,
					success:false
				})
			}
		console.log("chenggong");

		// to make sure
		req.flash('success', 'Successfully Post Travel Note!');
		// where to redirect back?
		// res.redirect(callbackURI);
		return res.redirect('/profile/planmaking');
	});
}
	else{
		return res.redirect('/profile/planmaking');
	}
}
