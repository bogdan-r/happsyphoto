/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt-nodejs');

function hashPassword(values, next){
  bcrypt.hash(values.password, null, null, function(err, hash){
    if(err){
      next(err);
    }
    values.password = hash;
    next(null, values);
  })
}

module.exports = {

  attributes: {
    username :{
      type : 'string',
      required: true,
      unique : true
    },
    password : {
      type : 'string',
      required : true
    },
    toJSON : function(){
      var obj = this.toObject();
      obj.avatars = {}
      delete obj.password;

      return obj;
    }
  },
  beforeCreate : function(values, next){
    hashPassword(values, next);
  },
  beforeUpdate : function(values, next){
    if(values.password){
      hashPassword(values, next);
    }else{
      User.findOne(values.id).exec(function(err, user){
        if(err){
          next(err);
        }else{
          values.password = user.password;
          next();
        }
      })
    }
  }
};

