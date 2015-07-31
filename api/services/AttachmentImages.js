var path = require('path');

var ATTACHMENT_URL_ASSET = process.cwd() + '/attachments/uploads/Attachment/';
var ATTACHMENT_URL_ASSET_PUBLIC = '/uploads/Attachment/';

function AttachmentImages(){}

AttachmentImages.getAttachmentsUrl = function(){
  return {
    attachmentsUrlAsset : ATTACHMENT_URL_ASSET,
    attachmentsUrlAssetPublic : ATTACHMENT_URL_ASSET_PUBLIC
  }
}

AttachmentImages.getAttachmentUrlPublic = function(id, nameFile){
  var publicPath = AttachmentImages.getAttachmentsUrl().attachmentsUrlAssetPublic;
  return publicPath + id + '/' + nameFile
}

module.exports = AttachmentImages