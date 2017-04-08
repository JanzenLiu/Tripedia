var mongoose=require('mongoose');
var Connection = require('./db');


// Schema for Attraction ========================
var spot= new mongoose.Schema({
    name: String,
    //id: Number,
    city: {
      cid: mongoose.Schema.Types.ObjectId,
      name: String
    },
    type: String, // add enum?
    //picture
    introduction: String,
    phone: String, // add validation?
    website: String, // add validation?
    position: {
        longtitude: String, // or String, or add validation?
        langtitude: String
    },
    transport: {
      rough: String,
      detail: String
    },
    travelTime: String,
    ticket: String,
    openTime: String,
    comments: [{
        uid: mongoose.Schema.Types.ObjectId,
        name: String,
        body: String
    }]

    /////////////// to be supplement //////////////////
});

var Spot = mongoose.model('Spot', spot);

module.exports = Spot;
