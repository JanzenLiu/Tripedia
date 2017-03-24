// import module and create object ==================
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/app_test';

// connect to the database server ===================

MongoClient.connect(url, function(err, db){
	if(err)
		console.log(err); // to indicate that this is a connection error?
	else{

		console.log('Connection is established successfully to', url);

		// find/get the collection
		var collection = db.collection('message');

		// create documents
		var m1 = {length: 7, content: 'Chatbox'};
		var m2 = {length: 16, content: 'Why join Pactera'};
		
		// insert documents
		collection.insert([m1, m2], function(err, result){
			if(err)
				console.log(err);
			else
				console.log('Insert %d documents into the "message" collection. The documents inserted with "_id" are:', result.result.ok, result.insertedIds);
		})

		db.close();
	}
})