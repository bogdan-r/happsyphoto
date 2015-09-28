class WelcomePageView extends Backbone.View

  events: {
    'click .js-favorite-page-add' : 'showFavoriteModalHandler'
    'click .js-favorite-page-delete' : 'deleteFavoriteItemHandler'
  }

  initialize: ()->
    @favoriteView = new FavoriteView({
      el: '#favoriteAttachmentList'
    })
    $('#favoriteModal').on('hidden.bs.modal', (e)=>
      @favoriteView.$el.empty()
    )

  showFavoriteModalHandler: (e)->
    favoriteAttachments = new HappsyApp.Collections.FavoriteAttachment()
    $('#favoriteModal').modal('show')
    favoriteAttachments.fetch({
      reset : true
      success: (collection, response, options)=>
        @favoriteView.collection = collection
        @favoriteView.render()
      error: ()->
    })

  deleteFavoriteItemHandler: (e)->
    e.preventDefault()
    @_deleteFavoriteItem($(e.currentTarget).attr('href'))

  _deleteFavoriteItem: (url)->
    if confirm('Вы действительно хотитие удалить фотографию')
      $.ajax({
        url: url
        type: 'DELETE'
        headers: {
          'X-CSRF-Token': $('meta[name="token"]').attr('content')
        }
        success: ()->
          document.location.reload(true)
      })