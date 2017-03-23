var mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/////////////////////// To store session locally ////////////////////
// var store = new MongoStore({
// 	uri: 'mongodb://localhost:27017:/connect-mongo-test',
// 	collection: 'test005'
// })

//////////////////////////// NativeConnection ///////////////////////
// mongoose.connect('mongodb://test', function(err){
// 	if(err)
// 		console.log(err);
// 	// else
// 	// 	console.log(mongoose.connection);
// });

/////////////////////////// NativeConnection //////////////////////////
var db = mongoose.createConnection('localhost', 'test');

db.on('error', function(err){
	console.log(err)
});

db.once('open', function(){
	console.log(db); 
})

// ==================================================================
var testSchema = mongoose.Schema({name : String});
var testModel = mongoose.model('test', testSchema);

var test = new testModel({name : 'test'});
test.save(function(err){
	if(err)
		console.log(err);
	// else
	// 	console.log(test.name + " " + test._id);
});
// testModel.save();

console.log(mongoose.connection.collections);
db.close(function(err){
	if(err)
		console.log(err);
})

// console.log(mongoose.connection.collections);
