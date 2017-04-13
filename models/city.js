var mongoose = require('mongoose');
var Connection = require('./db');
var random = require('mongoose-simple-random');

// Schema for City ========================
var citySchema = mongoose.Schema({
	
    name: String,
    country: String,
    path: String,
    attractions: [{
  	   aid: mongoose.Schema.Types.ObjectId,
  	   name: String
    }],
    pois: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "poi"
    }],
    intro: String,
    description: {
    	subtitles: [String],
    	bodies: [String]
    },
    imageUrl: String

  ////////////// to be supplement /////////////////
});
citySchema.plugin(random);

// methods ================================
//searching part
//accurate searching by city name
citySchema.statics.findById = function(id, cb){
    return this.findOne({_id: mongoose.Types.ObjectId(id)}, cb);
};

module.exports = mongoose.model('City', citySchema);