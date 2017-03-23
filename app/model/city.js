var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/myappdatabase');

// var Schema=mongoose.Schema;
// var citySchema=new Schema({

// Schema for City ========================
var citySchema = mongoose.Schema({
  name 				: String,
  id 				: Integer,
  attractions		: [{
  	aid: Schema.Types.ObjectId,
  	name: String
  }],
  brief 			: String

  ////////////// to be supplement /////////////////
});

var City = mongoose.model('City', citySchema);

module.exports = City;


// methods ================================
//searching part
//accurate searching by city name
var city_name;
var query = City.findOne('name': city_name);

//select the name brief fields
query.select('name bried');

//execute the query
query.exec(function (err, spot){
  if (err) return handleError(err);
  console.log('%s %s', city.name, city.brief)
});

//store in table
var city_id;
var city_brief;
var city_location;

//store function
var new_city=new City({})

module.exports = mongoose.model('City', citySchema);
