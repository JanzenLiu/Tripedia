var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer  = require('multer');

// router setup
var routes = require('./routes/index');
var settings = require('./settings');
var Connection = require('./models/db');
var flash = require('connect-flash');

var multer  = require('multer');
var app = express();

// application engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname, + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //true: use qs; false: use querystring
app.use(cookieParser());
app.use(session({
	secret: settings.cookieSecret,
	key: settings.db, // cookie name
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		// db: settings.db,
		// host: settings.host,
		// port: settings.port
		url: 'mongodb://' + settings.host + ':' + settings.port + '/' + settings.db,
		autoRemove: 'native'
	})
}));
app.use(express.static('public'));


var upload = multer({
  dest: './public/images'
});

routes(app);

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
// // catch 404 and forward to error handler
// // located at the bottom of the function stack
// app.use(function(req, res, next){
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// // error handlers =============

// // development error handler
// // will print stackrace
// if(app.get('env') === 'development'){
// 	app.use(function(err, req, res, next){
// 		res.status(err.status || 500);
// 		res.render('error',{	// template for error not defined
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }

// // production error handler
// // no stackraces leaked to user
// app.use(function(err, req, res, next){
// 	res.status(err.status || 500);
// 	res.render('error',{
// 		message: err.message,
// 		error: {}
// 	});
// });

// module.exports = app;
