class FavoriteView extends Backbone.View

  initialize: ->
    $('.js-save-favorite-attachment').on('click', @saveFavoriteAttachmentHandler)

  saveFavoriteAttachmentHandler: (e)=>
    $.ajax({
      url: "/api/admin/favorite_attachment"
      method: "post"
      data: @$el.serialize()
      headers: {
        'X-CSRF-Token': $('meta[name="token"]').attr('content')
      }
      success: ()->
        console.log 'success'
    })

  render: ()->
    @collection.each((favoriteItem)=>
      favoriteItem = new FavoriteItemView({
        model: favoriteItem
      })

      @$el.append(favoriteItem.render().el)
    )
    @
