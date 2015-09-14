/**
 * Admin/AttachmentController
 *
 * @description :: Server-side logic for managing Admin/attachments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    PaginationService.paginate(Attachment, req).then(function(pagResult){
      Attachment.find().sort('createdAt DESC').paginate(pagResult).exec(function(err, attachments){
        if (err) {return res.badRequest()}
        return res.view({
          attachments: execToJSON(attachments),
          pagResult: pagResult
        })
      })
    })
  },

  new: function (req, res) {
    res.view()
  },

  edit: function (req, res) {
    Attachment.findOne({id: req.param('id')}).exec(function(err, attachment){
      if (err) {return res.badRequest()}
      res.view({
        attachment: attachment.toJSON()
      })
    })

  },

  create: function (req, res) {
    var fileInfo = req.file('file')._files[0].stream;
    var params = {
      title: req.param('title'),
      file: fileInfo.filename,
      file_size: fileInfo.byteCount,
      mime_type: fileInfo.headers['content-type']
    }

    Attachment.create(params).exec(function (err, attachment) {
      if (err) {return res.badRequest()}
      var attachmentUrl = AttachmentImages.getAttachmentsUrl().attachmentsUrlAsset + attachment.id + '/';
      req.file('file').upload({
        dirname: attachmentUrl,
        saveAs: function(__newFileStream,cb){
          cb(null, __newFileStream.filename)
        }
      }, function (err, uploadedFiles) {
        if (err) {return res.badRequest()}
        return res.json(attachment)
      })
    })

  },

  update: function (req, res) {
    var params = {
      title: req.param('title'),
      published_state: req.param('published_state')
    }
    Attachment.update({id: req.param('id')}, params).exec(function(err, attachment){
      if (err) {return res.badRequest()}
      return res.redirect('../..')
    })
  },

  destroy: function (req, res) {
    var params = {
      id: req.param('id')
    }
    Attachment.update(params, {published_state: 'deleted'}).exec(function(err){
      if(err){res.badRequest()}
      return res.json({ok: true})
    })
  },

  restore: function(req, res){
    var params = {
      id: req.param('id')
    }
    Attachment.update(params, {published_state: 'active'}).exec(function(err){
      if(err){res.badRequest()}
      return res.json({ok: true})
    })
  }
};

