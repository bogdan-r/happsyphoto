class GalleryErrorListView extends Backbone.View

  initialize: ()->
    @errorsFiles = @options.errorsFiles || []

  render: ->
    _.each(@errorsFiles, (file)=>
      img = $(file.previewElement).find('.js-dropzone-thumbnail img').clone()
      img.addClass('gallery-new-error-file-item')
      @$el.append(img)
    )
    @