class WelcomePageView extends Backbone.View

  events: {
    'click .js-favorite-page-add' : 'showFavoriteModalHandler'
  }

  initialize: ()->
    @favoriteView = new FavoriteView({
      el: '#favoriteAttachmentList'
    })
    $('#favoriteModal').on('hidden.bs.modal', (e)=>
      @favoriteView.$el.empty()
    )

  showFavoriteModalHandler: (e)->
    favoriteAttachments = new HappsyApp.Collections.Attachments()
    $('#favoriteModal').modal('show')
    favoriteAttachments.fetch({
      reset : true
      success: (collection, response, options)=>
        @favoriteView.collection = collection
        @favoriteView.render()
      error: ()->
    })
