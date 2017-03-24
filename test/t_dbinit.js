// // ==================================================
// // ===== Method 1: mongodb, MongoClient.connect =====
// // ==================================================
// // import module and create object ==================
// var mongodb = require('mongodb');

// var MongoClient = mongodb.MongoClient;
// var url = 'mongodb://localhost:27017/app_test';

// // connect to the database server ===================
// MongoClient.connect(url, function(err, db){

// 	if(err)
// 		console.log(err);
// 	else{

// 		// get the collection
// 		var message = db.collection('message');

// 		// use Cursor to iterate through each document in the cursor
// 		message.find().forEach(function(doc){
// 			console.log(doc.content);
// 		})

// 		// create documents, insert documents
// 		// var m1 = {length: 7, content: 'Chatbox'};
// 		// var m2 = {length: 16, content: 'Why join Pactera'};
		
// 		// collection.insert([m1, m2], function(err, result){
// 		// 	if(err)
// 		// 		console.log(err);
// 		// 	else
// 		// 		console.log('Insert %d documents into the "message" collection. The documents inserted with "_id" are:', result.result.ok, result.insertedIds);
// 		// })

// 		db.close();
// 	}
// });


// ====================================================
// ================ Method 2: mongoose ================
// ====================================================
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app_test');

var conn = mongoose.connection;
var colc = conn.collection('message');

var testSchema = new mongoose.Schema({
	value: Number,
	msg: String
});

var Test = mongoose.model('Test', testSchema);
var t1 = new Test({
	value: 214234,
	msg: 'capslock'
});
var t2 = new Test({
	value: 1729,
	msg: 'optiplex'
});

colc.insert([t1, t2]);
t1.save();
t2.save();
//colc.save(); // unnecessary

// console.log(Test);
// console.log(t1.schema.tree);
//console.log(colc);

//conn.close();

module.exports = {
	model: Test,
	db: conn
}


