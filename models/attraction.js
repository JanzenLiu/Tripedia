var mongoose = require('mongoose');
var Connection = require('./db');


// Schema for Attraction ========================
var poiSchema = new Schema({
    name: String,
    types: [String], 
    cityName: String,
    cityPath: String,
    introduction: [String],
    contact: [String],
    // phone: String,
    // website: String,
    location: String,
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


module.exports = mongoose.model('poi', poiSchema);



// methods ================================
