'use strict'

class AttachmentService {
  constructor(options) {
    this.attachmentsUrlAsset = process.cwd() + options.attachmentsUrlAsset
    this.attachmentsUrlAssetPublic = options.attachmentsUrlAssetPublic
  }

  getAttachmentsUrl() {
    return {
      attachmentsUrlAsset: this.attachmentsUrlAsset,
      attachmentsUrlAssetPublic: this.attachmentsUrlAssetPublic
    }
  }

  getAttachmentUrlPublic(id, nameFile) {
    var publicPath = this.getAttachmentsUrl().attachmentsUrlAssetPublic;
    return publicPath + id + '/' + nameFile
  }

  static filterByActive(attachments, fieldName) {
    return attachments.filter(function (item) {
      var distanationAttachment = fieldName ? item[fieldName] : item;
      if (distanationAttachment.isActive()) {
        return item
      }
    });

  }
}

module.exports = AttachmentService