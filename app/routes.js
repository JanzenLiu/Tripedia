module.exports = function(app, passport){

	// ==================================
	// HOMEPAGE =========================
	// ==================================
	app.get('/', function(req, res){
		res.render('index.ejs'); //pathname correctly set?
	});

	// ==================================
	// LOGIN ============================
	// ==================================
	// show the login form
	app.get('/login', function (req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login',{
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the login page if there is an error
		failureFlash : true
	}));

	// ==================================
	// SIGNUP ===========================
	// ==================================
	// show the signup form
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message : req.flash('signupMessage')});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signp page if there is an error
		failureFlash : true
	}));
}