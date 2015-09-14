class AttachmentUpload extends Backbone.View

  events: {
    'click .js-load-all-files': 'loadAllFilesHandler'
    'click .js-cancel-loading': 'cancelLoading'
  }
  initialize: ()->
    if @$el.hasClass(@$el.selector.slice(1))
      @dropzone = new Dropzone(@$el.selector, {
        acceptedFiles: "image/*"
        url: '/api/admin/upload_attacment'
        thumbnailWidth: 100
        thumbnailheight: 100
        parallelUploads: 20
        autoQueue: false
        maxFilesize: 5
        clickable: '.js-add-dropzone-file'
        previewsContainer: '.js-preview-dropzone'
        previewTemplate: JST['assets/templates/admin/attachment/preview.html']()
        headers: {
          'X-CSRF-Token': $('meta[name="token"]').attr('content')
        }
      })

      @dropzone.on('addedfile', @dropzoneAddedfile)
      @dropzone.on('totaluploadprogress', @dropzoneTotaluploadprogress)
      @dropzone.on('sending', @dropzoneSending)
      @dropzone.on('queuecomplete', @dropzoneQueuecomplete)
      @dropzone.on('success', @dropzoneSuccess)

  dropzoneAddedfile: (file)->
    $(file.previewElement).find('.js-upload-file').on('click', ()=>
      @.enqueueFile(file)
    )

  dropzoneSending: (file, xhr, formData)->
    $('.js-total-progress').css('opacity', '1')
    $(file.previewElement).find('.js-upload-file').attr('disabled', 'disabled')
    formData.append("title", $(file.previewElement).find('.js-dropzone-title').val());

  dropzoneTotaluploadprogress: (progress)->
    $('.js-total-progress .progress-bar').width("#{progress}%")

  dropzoneQueuecomplete: (progress)->
    $('.js-total-progress').css('opacity', '0')

  dropzoneSuccess: (file, responseText)->
    $(file.previewElement).find('.js-dropzone-success').fadeIn();

  loadAllFilesHandler: (e)->
    @dropzone.enqueueFiles(@dropzone.getFilesWithStatus(Dropzone.ADDED));

  cancelLoading: (e)->
    @dropzone.removeAllFiles(true);

  getDropzoneInstance: ->
    @dropzone
