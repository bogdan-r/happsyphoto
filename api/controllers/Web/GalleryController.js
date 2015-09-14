module.exports = {
  show: function (req, res) {
    var params = OnlyParams(req, ['slug']);

    Gallery.findOne({slug: params.slug}).populateAll().then(function(gallery){

      var galleryAttachment = GalleryAttachment.find({
        gallery: _.pluck(gallery.attachment, 'gallery')
      }).populate('attachment').sort('order ASC')

      return [gallery, Category.find(), galleryAttachment]
    }).spread(function(gallery, categories, galleryAttachment){
        console.log(galleryAttachment)
        res.view({
          galleryAttachment: execToJSON(galleryAttachment),
          categories: categories,
          gallery: gallery.toJSON()
        })
      }).catch(function(err){
        if (err) {return res.badRequest()}
      })
  }
}