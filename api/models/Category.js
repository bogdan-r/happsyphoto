/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var tr = require('transliteration');
var async = require('async')
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    galleries: {
      collection: 'gallery',
      via: 'categories'
    },
    slug: {
      type: 'string',
      required: true,
      unique: true
    }
  },
  beforeValidate: function(values, next){
    var model = this;
    if(values.id){
      model.findOne(values.id).then(function(item){
        if(item.name === values.name){
          next()
        }else{
          uniqueSlug(model, values, next)
        }
      })
    }else{
      uniqueSlug(model, values, next)
    }
  }
};

