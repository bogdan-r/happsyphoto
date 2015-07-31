class AttachmentPageView extends Backbone.View

  events: {
    'change .js-attachment-group': 'showGroupSettingsHandler'
    'click .js-delete-attachments': 'deleteAttachmentsHandler'
    'click .js-delete-attachment': 'deleteAttachmentHandler'
    'click .js-restore-attachments': 'restoreAttachmentsHandler'
    'click .js-restore-attachment': 'restoreAttachmentHandler'
  }

  showGroupSettingsHandler: (e)->
    if $('.js-attachment-group:checked').length
      $('.js-group-settings').show()
    else
      $('.js-group-settings').hide()

  deleteAttachmentsHandler: (e)->
    e.preventDefault()
    @_deleteAttachments($.param($('.js-attachment-group:checked')))

  deleteAttachmentHandler: (e)->
    e.preventDefault()
    idAttach = $.param($(e.currentTarget).closest('tr').find('.js-attachment-group'))
    @_deleteAttachments(idAttach)

  restoreAttachmentsHandler: (e)->
    e.preventDefault()
    @_restoreAttachments($.param($('.js-attachment-group:checked')))

  restoreAttachmentHandler: (e)->
    e.preventDefault()
    idAttach = $.param($(e.currentTarget).closest('tr').find('.js-attachment-group'))
    @_restoreAttachments(idAttach)

  _deleteAttachments: (data)->
    if confirm('Вы действительно хотитие удалить фотографии')
      $.ajax({
        url: '/admin/attachment/destroy'
        type: 'POST'
        data: data
        headers: {
          'X-CSRF-Token': $('meta[name="token"]').attr('content')
        }
        success: ()->
          document.location.reload(true)
      })

  _restoreAttachments: (data)->
    $.ajax({
      url: '/admin/attachment/restore'
      type: 'POST'
      data: data
      headers: {
        'X-CSRF-Token': $('meta[name="token"]').attr('content')
      }
      success: ()->
        document.location.reload(true)
    })