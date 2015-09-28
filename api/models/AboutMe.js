/**
 * Pages.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    header_body: {
      type: 'string',
      defaultsTo: ''
    },
    body: {
      type: 'string',
      defaultsTo: ''
    },
    footer_body: {
      type: 'string',
      defaultsTo: ''
    },
    file: {
      type: 'string'
    },
    isLoadAvatar: {
      type: 'boolean',
      defaultsTo: false
    },
    toJSON : function(){
      var obj = this.toObject();
      obj.imgUrl = AboutMeImage.getAttachmentUrlPublic(this.id, this.file);

      return obj;
    }
  }
};

