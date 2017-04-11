var User = require('../../models/user');
var Plan = require('../../models/plan');
var mongoose = require('mongoose')
module.exports = function(title, brief, authorId, authorName, flag, key, callback){
  if(flag == 1){
    console.log("abccc");
  var newPlan = new Plan({
    title: title,
    author: {
      uid: authorId,
      name: authorName
    },
    brief: brief
  });
  newPlan.save(function(err, plan){
    if(err){
      return callback(err);
    }
    console.log(plan);
    User.update({_id:mongoose.Types.ObjectId(authorId)},{
      $push:{"plans": plan._id},
      $inc :{plan_conunts:1}
    },function(err, numAffected){
      if(err){
        return callback(err);
      }
    });
    callback(null);
  });

}
else{
  console.log(authorId);
  Plan.update({
    "key":key
  },{
    $set:{
      title:title,
      brief:brief
    },function(err){
      if (err){
        console.log('error', err);
        return callback(err);
      }
      callback(null);
    }
  });
}
}
