var express = require('express');
var router = express.Router();
var searchCity = require('../controllers/search/searchCity');
var searchSpot = require('../controllers/search/searchPoi');
var searchNote = require('../controllers/search/searchNote');
var searchUser = require('../controllers/search/searchUser');

router.get('/', function (req, res) {
  console.log(req.query);
  if (req.query.type=='city'){
  searchCity(req.query.q, function (err, cities) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    res.render('searchCities', {
      title: "SEARCH:" + req.query.q,
      user: req.session.user,
      posts: cities,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
  });
  });
  }
  else if (req.query.type=='note'){
    searchNote(req.query.q, function (err, notes) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
<<<<<<< HEAD
      res.render('searchpost', {
=======
      console.log(notes);
<<<<<<< HEAD
      res.render('searchpost', {
=======
      res.render('search', {
>>>>>>> 7bd3fcf4efef77919759a7051706481755260de1
>>>>>>> 8e9239f352a64178b42b7a7a37a257dcbf33dc47
        title: "SEARCH:" + req.query.q,
        user: req.session.user,
        posts: notes,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  });
}
  else if (req.query.type=='poi'){
    searchPoi(req.query.q, function (err, posts) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
<<<<<<< HEAD
      res.render('searchpoi', {
=======
      res.render('searchPoi', {
>>>>>>> 8e9239f352a64178b42b7a7a37a257dcbf33dc47
        title: "SEARCH:" + req.query.q,
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  });
}
  else{
    searchUser(req.query.q, function (err, users) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('searchuser', {
        title: "SEARCH:" + req.query.q,
        user: req.session.user,
        posts: users,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  });
}
});
module.exports = router;
