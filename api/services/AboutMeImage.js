'use strict'
var AttachmentService = require('./AttachmentService');
class AboutMeImage extends AttachmentService{}

module.exports = new AboutMeImage({
  attachmentsUrlAsset: '/attachments/uploads/AboutMe/',
  attachmentsUrlAssetPublic: '/uploads/AboutMe/'
})