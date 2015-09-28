'use strict'
var AttachmentService = require('./AttachmentService');
class AttachmentImages extends AttachmentService{}

module.exports = new AttachmentImages({
  attachmentsUrlAsset: '/attachments/uploads/Attachment/',
  attachmentsUrlAssetPublic: '/uploads/Attachment/'
})