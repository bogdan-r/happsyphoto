class GalleryAttachmentUpload extends AttachmentUpload

  dropzoneAddedfile: (file)->
    super file
    coverImgRadioTmpl = JST['assets/templates/admin/attachment/gallery_addition.html']()
    $(file.previewElement).find('.js-dropzone-thumbnail').append(coverImgRadioTmpl)
