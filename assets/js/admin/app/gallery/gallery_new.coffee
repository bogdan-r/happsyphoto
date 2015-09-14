class GalleryNew extends Backbone.View

  events: {
    'submit .js-gallery-new-form': 'submitFormHandler'
  }

  initialize: ()->
    if @$el.hasClass(@$el.selector.slice(1))
      @uploadedFiles = {
        attachment: []
        order: []
      }
      @dropzone = @options.dropzone

      @dropzone.on('queuecomplete', ()=>
        @dropzoneQueuecomplete()
      )
      @dropzone.on('success', (file, responseText)=>
        @dropzoneSuccess(file, responseText)
      )

      $('.js-preview-dropzone').sortable()

  submitFormHandler: (e)->
    e.preventDefault()

    @dropzone.enqueueFiles(@dropzone.getFilesWithStatus(Dropzone.ADDED));

  dropzoneQueuecomplete: (progress)->
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
