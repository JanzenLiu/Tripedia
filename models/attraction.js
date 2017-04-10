var mongoose = require('mongoose');
var Connection = require('./db');


// Schema for Attraction ========================
var poiSchema = new mongoose.Schema({
    name: String,
    types: [String], 
    cityName: String,
    cityPath: String,
    introduction: [String],
    imageUrl: String,
    contact: [String],
    // phone: String,
    // website: String,
    location: String,
    position: {
        longtitude: String, // or String, or add validation?
        langtitude: String
    },
    ticket: String,
    openTime: String,
    comments: [{
        uid: mongoose.Schema.Types.ObjectId,
        name: String,
        body: String
    }]

    /////////////// to be supplement //////////////////
});

poiSchema.statics.findById = function(id, cb){
    return this.findOne({_id: mongoose.Types.ObjectId(id)}, cb);
};

module.exports = mongoose.model('poi', poiSchema);



// methods ================================
