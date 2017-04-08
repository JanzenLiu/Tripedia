var mongoose = require('mongoose');
var Connection = require('./db');

// Schema for City ========================
var citySchema = mongoose.Schema({
    name: String,
    attractions: [{
  	   aid: mongoose.Schema.Types.ObjectId,
  	   name: String
    }],
    brief: String,
    description: String

  ////////////// to be supplement /////////////////
});

// methods ================================
//searching part
//accurate searching by city name
citySchema.statics.findById = function(id, cb){
    return this.findOne({_id: mongoose.Types.ObjectId(id)}, cb);
};

module.exports = mongoose.model('City', citySchema);