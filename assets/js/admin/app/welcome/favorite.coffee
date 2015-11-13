class FavoriteView extends Backbone.View

  initialize: ->
    $('.js-save-favorite-attachment').on('click', @saveFavoriteAttachmentHandler)

  saveFavoriteAttachmentHandler: (e)=>
    console.log @$el.serialize()
    $.ajax({
      url: "/api/admin/favorite_attachment"
      method: "post"
      data: @$el.serialize()
      headers: {
        'X-CSRF-Token': $('meta[name="token"]').attr('content')
      }
      success: ()->
        window.location.reload()
    })

  render: ()->
    @collection.each((favoriteItem)=>
      favoriteItem = new FavoriteItemView({
        model: favoriteItem
      })

      @$el.append(favoriteItem.render().el)
    )
    setTimeout(->
      $('.js-favorite-item-img').lazyload({
        container: $("#favoriteAttachmentList")
        skip_invisible: false
      })
    , 500)

    @
