class GalleryEdit extends Backbone.View

  events: {
    'change .js-gallery-edit-group': 'showGroupSettingsHandler'
    'click .js-gallery-edit-delete-photos': 'deletePhotosHandler'
    'click .js-gallery-edit-delete-photo': 'deletePhotoHandler'
    'submit .js-gallery-edit-form': 'editGalleryHandler'
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

  showGroupSettingsHandler: (e)->
    if $('.js-gallery-edit-group:checked').length
      $('.js-gallery-edit-delete-photos').show()
    else
      $('.js-gallery-edit-delete-photos').hide()

  deletePhotosHandler: (e)->
    data = $.param($('.js-gallery-edit-group:checked'))
    @_deletePhotos(data)

  deletePhotoHandler: (e)->
    e.preventDefault()
    $input = $(e.currentTarget).closest('.like-table-row').find('.js-gallery-edit-group')
    $input.attr('checked', 'checked')
    data = $.param($input)
    @_deletePhotos(data)

  editGalleryHandler: (e)->
    e.preventDefault()
    @_setLoadedFileInfo()
    if @dropzone.getAcceptedFiles().length
      @dropzone.enqueueFiles(@dropzone.getFilesWithStatus(Dropzone.ADDED));
    else
      @_updateGallery()

  dropzoneQueuecomplete: ()->
    @_updateGallery()

  dropzoneSuccess: (file, responseText)->
    loadedAttachmentLength = $('.js-gallery-edit-attachment-item-order').length
    galleryAttachTmpl = JST['assets/templates/admin/attachment/gallery_attachment.html']({
      id: responseText.id
      order: $(file.previewElement).index() + loadedAttachmentLength
    })
    $(file.previewElement).find('.js-dropzone-thumbnail').append(galleryAttachTmpl)
    $(file.previewElement).find('.js-attachment-cover').attr('value', responseText.id)

  _deletePhotos: (data)->
    if confirm('Вы действительно хотитие удалить категорию')
      $.ajax({
        url: '/api/admin/delete_gallery_attachment'
        type: 'POST'
        data: data
        headers: {
          'X-CSRF-Token': $('meta[name="token"]').attr('content')
        }
        success: ()->
          $('.js-gallery-edit-group:checked').closest('.like-table-row').remove()

      })

  _updateGallery: ()->
    $form = $('.js-gallery-edit-form')
    data = $form.serialize()
    $.ajax({
      url: $form.attr('action')
      type: 'POST'
      data: data
      headers: {
        'X-CSRF-Token': $('meta[name="token"]').attr('content')
      }
      success: ()->
        location.reload()

    })

  _setLoadedFileInfo: ()->
    $('.js-gallery-edit-attachment-item-order').each((i)->
      $(this).val(i)
    )
