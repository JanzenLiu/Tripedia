module.exports = function(app){

	/*
	/: Homepage
	/login: user login
	/signup: user Signup
	/search: search for destination/travel notes...
	/dest: Entry for destinations
	/city/[cid]: City page
	/poi/[aid]: Attraction page
	/note: Entry for travel notes
	/note/[nid]: Single travel note page
	/user/[uid] : (Other) user page
	/user/[uid]/note: User travel note page
	/profile: Personal profile page
	/post: Post a travel note
	/logout: user logout
	*/



	app.use(function(req, res, next){
		res.locals.url = req.originalUrl;
		next();
	});
	app.get('/', function(req, res){
		// req.session.user = {
		// 	"__v":0,
		// 	"username":"liuyide",
		// 	"password":"25d55ad283aa400af464c76d713c07ad",
		// 	"email":"liuyide@gmail.com",
		// 	"_id":"58e64f48f63c722a733c88b9",
		// 	"followings_count": 0,
		// 	"followers_count": 0,
		// 	"travel_notes_id":[]
		// };
		res.render('index', {
			title: 'Homepage',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.use('/account', require('./account'));
	app.use('/profile', require('./profile'));
	app.use('/search', require('./search'));
	app.use('/dest', require('../controllers/dest'));

	app.use('/city', require('./city'));
	app.use('/spot', require('./spot'));
	app.use('/poi', require('./poi'));
	app.use('/singlenote', require('./singlenote'));
	app.use('/note', require('./note'));
	app.use('/user', require('./user'));
    // app.use('/edit', require('./edit'));

	// 404 Page


};
