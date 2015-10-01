class GalleryNew extends Backbone.View

  events: {
    'submit .js-gallery-new-form': 'submitFormHandler'
    'click .js-gallery-new-error-continue': 'continueCreateGalleryHandler'
    'click .js-gallery-new-error-cancel': 'cancelCreateGalleryHandler'
  }

  initialize: ()->
    if @$el.hasClass(@$el.selector.slice(1))
      @uploadedFiles = {
        attachment: []
        order: []
      }
      @nonLoadedFiles = []
      @dropzone = @options.dropzone

      @dropzone.on('queuecomplete', ()=>
        @dropzoneQueuecomplete()
      )
      @dropzone.on('success', (file, responseText)=>
        @dropzoneSuccess(file, responseText)
      )
      @dropzone.on('error', (file, responseText)=>
        @dropzoneError(file, responseText)
      )

      $('.js-preview-dropzone').sortable()

  submitFormHandler: (e)->
    e.preventDefault()

    @dropzone.enqueueFiles(@dropzone.getFilesWithStatus(Dropzone.ADDED));

  continueCreateGalleryHandler: (e)->
    @dropzoneUploadRequest()

  cancelCreateGalleryHandler: (e)->
    @rollbackGalleryCreate()

  dropzoneQueuecomplete: (progress)->
    if @nonLoadedFiles.length
      @showErrorsFileModal()
    else
      @dropzoneUploadRequest()

  rollbackGalleryCreate: ()->
    data = {
      ids : @uploadedFiles.attachment
    }
    $.ajax({
      url: '/admin/attachment/destroyMultiply',
      type: 'DELETE'
      data: data
      headers: {
        'X-CSRF-Token': $('meta[name="token"]').attr('content')
      }
      success: ()->
        location.href = '/admin/gallery/'
    })

  dropzoneUploadRequest: ()->
    data = "#{$.param(@uploadedFiles)}&#{$('.js-gallery-new-form').serialize()}"
    $.ajax({
      url: '/admin/gallery'
      type: 'POST'
      data: data
      headers: {
        'X-CSRF-Token': $('meta[name="token"]').attr('content')
      }
      success: ()->
        location.href = '/admin/gallery/'

    })

  dropzoneSuccess: (file, responseText)->
    coverImgLabel = $(file.previewElement).find('.js-attachment-cover:checked')
    if coverImgLabel.length
      $('.js-gallery-cover-img').val(responseText.id)
    @uploadedFiles.attachment.push(responseText.id)
    @uploadedFiles.order.push($(file.previewElement).index())

  dropzoneError: (file, responseText)->
    @nonLoadedFiles.push(file)

  showErrorsFileModal: ()->
    $('#errorFilesModal').modal('show')
    new GalleryErrorListView({
      el: '.js-gallery-new-error-file-list'
      errorsFiles : @nonLoadedFiles
    }).render()

