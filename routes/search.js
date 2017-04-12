var express = require('express');
var router = express.Router();
var searchCity = require('../controllers/search/searchCity');
var searchPoi = require('../controllers/search/searchPoi');
var searchNote = require('../controllers/search/searchNote');
var searchUser = require('../controllers/search/searchUser');

router.get('/', function (req, res) {
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
      res.render('searchpost', {
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
      res.render('searchPoi', {
        title: "SEARCH:" + req.query.q,
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  });
}
});
router.get('/city', function(req, res){
  cityName=req.params.q;
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
});
module.exports = router;
