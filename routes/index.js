var loginRouter = require('./login');

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
	/user/[uid]/node: User travel note page
	/profile: Personal profile page
	/post: Post a travel note
	/logout: user logout

		*/
	app.get('/', function(req, res){
		res.render('index', {title: 'Homepage'});
	});

	// How to combine login and signup in one single page
	app.use('/login', loginRouter)

	app.get('/signup', function(req, res){
		res.render('signup', {title: 'Signup'});
	});
	app.post('/signup', function(req, res){
	});

	app.get('/search', function(req, res){
		
	})

	app.get('/dest', function(req, res){
		res.render('dest', {title: 'Destinations'});
	});
	// City, Poi ...
	app.use('/city', require('./city'));
	app.use('/poi', require('./poi'));

	app.get('/note', function(req, res){
		res.render('note', {title: 'Travel Notes'});
	});
	// Single travel notes...
	// User
	app.use('/user', require('./user'));

	app.get('/profile', function(req, res){			// add validation
		res.render('profile', {title: 'Profile'});
	});

	app.get('/post', function(req, res){
		res.render('post', {title: 'Post a Travel Note'});
	});
	app.post('/', function(req, res){
	});
	
	app.get('/logout', function(req, res){
	});

	// 404 Page
};