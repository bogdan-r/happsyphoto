'use strict'
var path = require('path');

class AttachmentService {
  constructor(options){
    this.attachmentsUrlAsset = process.cwd() + options.attachmentsUrlAsset
    this.attachmentsUrlAssetPublic = options.attachmentsUrlAssetPublic
  }

  getAttachmentsUrl(){
    return {
      attachmentsUrlAsset : this.attachmentsUrlAsset,
      attachmentsUrlAssetPublic : this.attachmentsUrlAssetPublic
    }
  }

  getAttachmentUrlPublic(id, nameFile){
    var publicPath = this.getAttachmentsUrl().attachmentsUrlAssetPublic;
    return publicPath + id + '/' + nameFile
  }
}

module.exports = AttachmentService