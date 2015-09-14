$ ()->
  $('.js-select2-multi').select2({
    allowClear: true
  })
  attachmentUpload = new AttachmentUpload({
    el: '.js-attach-dropzone'
  })
  galleryAttachmentUpload = new GalleryAttachmentUpload({
    el: '.js-gallery-attach-dropzone'
  })

  attachmentPageView = new AttachmentPageView({
    el: '.js-attachment-page'
  })

  categoryPageView = new CategoryPageView({
    el: '.js-category-page'
  })

  galleryNew = new GalleryNew({
    el: '.js-gallery-new'
    dropzone: galleryAttachmentUpload.getDropzoneInstance()
  })

  galleryEdit = new GalleryEdit({
    el: '.js-gallery-edit'
    dropzone: galleryAttachmentUpload.getDropzoneInstance()
  })

  galleryPageView = new GalleryPageView({
    el: '.js-gallery-page'
  })

  if $('.js-favorite-page').length
    new WelcomePageView({
      el: '.js-favorite-page'
    })


