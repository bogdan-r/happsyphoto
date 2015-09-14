class GalleryPageView extends Backbone.View

  events: {
    'click .js-gallery-delete': 'deleteGalleryHandler'
  }

  deleteGalleryHandler: (e)->
    e.preventDefault()
    @_deleteGallery($(e.currentTarget).attr('href'))

  _deleteGallery: (url)->
    if confirm('Вы действительно хотитие удалить галерею')
      $.ajax({
        url: url
        type: 'DELETE'
        headers: {
          'X-CSRF-Token': $('meta[name="token"]').attr('content')
        }
        success: ()->
          document.location.reload(true)
      })