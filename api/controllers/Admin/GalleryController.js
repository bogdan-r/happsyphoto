/**
 * Admin/GalleryController
 *
 * @description :: Server-side logic for managing Admin/galleries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    PaginationService.paginate(Gallery, req).then(function (pagResult) {
      Gallery.find().populateAll().sort('createdAt DESC').paginate(pagResult).exec(function (err, galleries) {
        if (err) {
          return res.badRequest()
        }
        return res.view({
          galleries: execToJSON(galleries),
          pagResult: pagResult
        })
      })
    })
  },

  new: function (req, res) {
    Category.find().exec(function (err, categories) {
      if (err) {
        return res.badRequest()
      }
      res.view({
        categories: categories
      })
    })
  },

  edit: function (req, res) {
    Gallery.findOne(req.param('id')).populateAll().then(function (gallery) {

      var galleryAttachment = GalleryAttachment.find({
        gallery: _.pluck(gallery.attachment, 'gallery')
      }).populate('attachment', {published_state: 'active'}).sort('order ASC')

      return [gallery, Category.find(), galleryAttachment]
    }).spread(function (gallery, categories, galleryAttachment) {
      var activeGalleryAttachment = AttachmentService.filterByActive(galleryAttachment, 'attachment');
      res.view({
        galleryAttachment: execToJSON(activeGalleryAttachment),
        categories: categories,
        gallery: gallery.toJSON()
      })
    }).catch(function (err) {
      if (err) {
        return res.badRequest()
      }
    })
  },

  create: function (req, res) {
    var params = OnlyParams(req, ['attachment', 'coverImg', 'name', 'category', 'order'])
    if (params.coverImg == '') {
      params.coverImg = params.attachment[0]
    }
    Gallery.create(params).then(function (gallery) {
      if (!_.isArray(params.category)) {
        params.category = [params.category]
      }
      var galleryAttachmentParam = []
      _.each(params.attachment, function (item, i) {
        galleryAttachmentParam.push({gallery: gallery.id, attachment: item, order: parseInt(params.order[i], 10)})
      });
      _.each(params.category, function (item) {
        gallery.categories.add(item)
      })
      gallery.save();
      return GalleryAttachment.create(galleryAttachmentParam)
    }).then(function (galleryAttachment) {
      return res.json({ok: true})
    }).catch(function (err) {
      console.log(err)
      if (err) {
        return res.badRequest()
      }
    })
  },

  update: function (req, res) {
    //TODO отрефакторить обновление
    var galleryAttachmentParam = [];
    var updateGalleryAttachmentIds = [];
    var updateAttachmentIds = [];
    var updateGalleryAttachmentParam = [];
    var updateAttachmentParam = [];
    var params = OnlyParams(req, ['id', 'name', 'category', 'coverImg']);
    if (!_.isArray(params.category)) {
      params.category = [params.category]
    }
    var attachments = req.param('attachments');
    var attachmentsNew = req.param('attachments_new');

    _.each(attachments, function (item) {
      updateGalleryAttachmentIds.push({id: item.galleryAttachId})
      updateAttachmentIds.push({id: item.id})
      updateGalleryAttachmentParam.push({order: item.order})
      updateAttachmentParam.push({title: item.title})
    });


    Gallery.update(params.id, params).then(function (gallery) {
      gallery = gallery[0];
      _.each(attachmentsNew, function (item) {
        galleryAttachmentParam.push({gallery: gallery.id, attachment: item.id, order: parseInt(item.order, 10)})
      });

      var galleryAttachmentUpdate = GalleryAttachment.find(updateGalleryAttachmentIds);
      var attachmentUpdate = Attachment.find(updateAttachmentIds);

      return [GalleryAttachment.create(galleryAttachmentParam),
        galleryAttachmentUpdate,
        attachmentUpdate,
        Gallery.findOne(params.id).populateAll()]
    }).spread(function (galleryAttachment, galleryAttachmentUpdate, attachmentUpdate, galleryPopulate) {
      var exisistCategories = _.map(galleryPopulate.categories, function (exisistCategory) {
        return exisistCategory.id.toString()
      })
      var unionCategories = _.union(exisistCategories, params.category)

      _.each(unionCategories, function (unionCategory) {
        if (_.indexOf(params.category, unionCategory) < 0) {
          galleryPopulate.categories.remove(unionCategory)
        } else if (_.indexOf(exisistCategories, unionCategory) < 0) {
          galleryPopulate.categories.add(unionCategory)
        }
      })
      _.each(attachments, function (attachment) {
        var galleryAttachmentInstance = _.find(galleryAttachmentUpdate, {id: parseInt(attachment.galleryAttachId)});
        var attachmentInstance = _.find(attachmentUpdate, {id: parseInt(attachment.id)});

        galleryAttachmentInstance.order = parseInt(attachment.order);
        attachmentInstance.title = attachment.title;
        galleryAttachmentInstance.save()
        attachmentInstance.save()
      });


      galleryPopulate.save()
      return res.json({ok: true})
    }).catch(function (err) {
      console.log(err)
      if (err) {
        return res.badRequest()
      }
    })
  },

  destroy: function (req, res) {
    Gallery.destroy({id: req.param('id')}).exec(function (err) {
      if (err) {
        return res.badRequest()
      }
      return res.ok()
    })
  },

  deleteAttach: function (req, res) {
    GalleryAttachment.destroy({id: req.param('gallery_id')}).exec(function (err) {
      console.log(err);
      if (err) {
        return res.badRequest()
      }
      return res.json({ok: true})
    })
  }
};

