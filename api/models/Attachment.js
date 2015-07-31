/**
* Attachment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      defaultsTo: ''
    },
    file: {
      type: 'string'
    },
    file_size: {
      type: 'integer'
    },
    mime_type: {
      type: 'string'
    },
    published_state: {
      type: 'string',
      enum: ['active', 'deleted'],
      defaultsTo: 'active'
    },
    toJSON : function(){
      var obj = this.toObject();
      obj.imgUrl = AttachmentImages.getAttachmentUrlPublic(this.id, this.file);

      return obj;
    }
  }
};

