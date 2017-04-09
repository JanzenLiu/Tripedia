var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase'); //to be modify
var Schema=mongoose.Schema;


// Schema for Attraction ========================
var spot= new Schema({
    name: String,
    //id: Number,
    type: String, // add enum?
    //picture
    introduction: String,
    phone: String, // add validation?
    website: String, // add validation?
    position: {
        longtitude: Double, // or String, or add validation?
        langtitude: Double
    }
    ticket: String,
    openTime: String,
    comments: [{
        uid: ObjectId,
        name: String,
        body: String
    }]

    /////////////// to be supplement //////////////////
});

var Spot = mongoose.model('Spot', spot);

module.exports = Spot;



// methods ================================
