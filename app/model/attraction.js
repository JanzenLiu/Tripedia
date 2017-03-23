var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');
var Schema=mongoose.Schema;
//create a spot table
var spot=new Schema({
  name: String,
  id: Number,//not sure
  type: String,
  //picture
  introduction: String,
  phone: Number,
  website: String,
  position: Array,//longtitude and latitude
  ticket: String,
  openTime: String,
  comments: String
});

var Spot = mongoose.model('Spot', spot);

module.exports=Spot;
//create engity
//var spotEntity=new Spot({name:'Beijing'});

//searching part

//accurate searching by spot name
var spot_name;//Assume spot_name is the name of spot
var query=Spot.findOne('name': spot_name);

//select the name intro fields
query.select('name introduction');

//excute the query
query.exec(function (err, spot) {
  if (err) return handleError(err);
  console.log('%s %s.', sopt.name, spot.introduction) // Space Ghost is a talk show host.
});

//searching by type
var spot_type;
var query=Spot.find('type': type_name);

//select the name intro fields
query.select('name introduction');

//execute the query
query.exec(function (err, spot)){
  if (err) return handleError(err);
  console.log('%s %s.'m spot.name, spot.introduction)
});

//store in table
var spot_id; 
var spot_type;
var spot_intro;
var spot_phone;
var spot_website;
var spot_position;
var spot_ticket;
var spot_openTime;
var spot_comments;

var new_spot=new Spot({})
