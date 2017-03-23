var mangoose=require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');
var Schema=mongoose.Schema;
var citySchema=new Schema({
  name: String,
  id: Number,
  location: Array,
  brief: Array
});
var City = mongoose.model('City', citySchema);

module.exports=City;

//searching part
//accurate searching by city name
var city_name;
var query=City.findOne('name': city_name);

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
