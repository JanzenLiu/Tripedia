var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postController = require('../controllers/post');
var planController = require('../controllers/plan/plan');
var CreatePlan = require('../controllers/plan/newplan');
var plan=require('../models/plan');
var title='title';
var brief='brief';
var flag=0;
router.get('/', function(req, res){
	res.render('profile',{
		title: 'My Profile',
		user: req.session.user,
		owner: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});


router.get('/following', function(req, res){});
router.get('/follower', function(req, res){});
router.get('/post', function(req, res){
	res.render('post',{
		title: 'Post a Travel Note',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/post', postController);
// router.get('/plan', function(req, res){
// 	res.render('plan',{
// 		title: 'Post a Travel Plan',
// 		user: req.session.user,
// 		success: req.flash('success').toString(),
// 		error: req.flash('error').toString()
// 	});
// });
// router.post('/plan', planController);
//at most five days
module.exports = router;
router.get('/planmaking', function(req, res){
		res.render('plan',{
			title: title,
			user: req.session.user,
			brief:brief,
			success:req.flash('success').toString(),
			error: req.flash('error').toString()
		});
});
router.post('/planmaking',function(req,res){
	flag=flag + 1;
	var old_title=title;
	title=req.body.title;
	brief=req.body.brief;
	var authorId = req.session.user._id;
	var authorName=req.session.user.username;
	CreatePlan(old_title, title, brief, authorId, authorName, flag, function(err){
		if(err){
			req.flash('error',err);
			return res.redirect('/profile/planmaking')
		}
	})
});
// router.get('/planmaking/:title', function(req, res){
// 	plan.findOne({
// 		"title":req.params.title
// 	},{
// 		"brief":1
// 	},function(err, plan){
// 		if(err){
// 			req.flash('error', err);
// 			return res.redirect('/profile/planmaking');
// 		}
// 		else{
// 			title=plan.title;
// 			brief=plan.brief;
// 			if (!brief){
// 				brief = 'brief';
// 			}
// 		}
// 		res.render('perPlan',{
// 			title: "plan for every day",
// 			user: req.session.user,
// 			dayNo:req.params.dayNo,
// 			success:req.flash('success').toString(),
// 			error: req.flash('error').toString
// 		});
// 	});
// 	res.render('plan',{
// 		title:"Design a plan",
// 		user: req.session.user,
// 		plantitle:title,
// 		brief:brief,
// 		success: req.flash('success').toString(),
// 		error: req.flash('error').toString()
// 	});
// })
router.get('/planmaking/:dayNo', function(req,res){
	res.render('perPlan',{
		title: title,
		user: req.session.user,
		dayNo:req.params.dayNo,
		success:req.flash('success').toString(),
		error: req.flash('error').toString
	});
});
router.post('/planmaking/:dayNo', planController);
