/**
* Gallery.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    categories: {
      collection: 'category',
      via: 'galleries',
      dominant: true
    },
    attachment: {
      collection: 'GalleryAttachment',
      via: 'attachment'
    },
    coverImg: {
      model: 'attachment',
      required: true
    },
    slug:{
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

