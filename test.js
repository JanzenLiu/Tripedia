var mongoose = require('mongoose');
mongoose.connect('localhost','tests');

var testSchema = mongoose.Schema({name : String});
var testModel = mongoose.model('test', testSchema);

var test = new testModel({name : 'test'});
test.save(function(err){
	if(err)
		console.log(err);
	else
		console.log('test has been saved');
});
