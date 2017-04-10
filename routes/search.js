var express = require('express');
var router = express.Router();
var searchCity = require('../controllers/search/searchCity');
var searchSpot = require('../controllers/search/searchSpot');
var searchNote = require('../controllers/search/searchNote');
router.get('/', function (req, res) {
  req.query.keyword='sdfsdf';
  searchNote(req.query.keyword, function (err, posts) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    res.render('search', {
      title: "SEARCH:" + req.query.keyword,
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
module.exports = router;
