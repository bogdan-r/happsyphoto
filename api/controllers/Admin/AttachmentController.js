/**
 * Admin/AttachmentController
 *
 * @description :: Server-side logic for managing Admin/attachments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

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
    var fileAttachment = req.file('file');

    if(_.isUndefined(fileAttachment._files[0])){
      fileAttachment.upload(()=>{})
      return res.serverError()
    }

    var fileInfo = fileAttachment._files[0].stream;
    var params = {
      title: req.param('title'),
      file: fileInfo.filename,
      file_size: fileInfo.byteCount,
      mime_type: fileInfo.headers['content-type']
    }

    Attachment.create(params).exec(function (err, attachment) {
      if (err) {return res.badRequest()}
      var attachmentUrl = AttachmentImages.getAttachmentsUrl().attachmentsUrlAsset + attachment.id + '/';
      fileAttachment.upload({
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

  state_to_delete: function (req, res) {
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
  },

  destroy: function(req, res){
    var ids = req.param('ids') || [req.param('id')]

    Attachment.destroy({id: ids}).exec(function(err){
      console.log(err);
      if (err) {return res.badRequest()}

      //NOTE Нам не важно, удалились ли все фотографии
      AttachmentDeletePhoto(ids).then(()=>{
        console.info(`all file attachments were deleted. Ids: ${ids}`);
      }).catch((err)=>{
        console.info(`file attachments is't deleted. Error: ${err}`);
      })

      return res.ok()
    })
  }
};

