var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postController = require('../controllers/post');
var planController = require('../controllers/plan/plan');
var CreatePlan = require('../controllers/plan/newplan');
var plan=require('../models/plan');
var title='Please enter the title of your plan';
var brief='Please write some brief introduction of your plan...';
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
	console.log(req.body.citi1);
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
	title=req.body.title;
	flag+=1;
	if(flag==1){
		key=title;
	}
	brief=req.body.brief;
	var authorId = req.session.user._id;
	var authorName=req.session.user.username;
	CreatePlan( title, brief, authorId, authorName, flag, key, function(err){
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
// 		title:"Design a plan"
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
module.exports = router;
