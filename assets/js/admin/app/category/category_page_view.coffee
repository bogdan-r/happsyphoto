class CategoryPageView extends Backbone.View

  events: {
    'click .js-category-delete': 'deleteCategoryHandler'
  }

  deleteCategoryHandler: (e)->
    e.preventDefault()
    @_deleteCategory($(e.currentTarget).attr('href'))

  _deleteCategory: (url)->
    if confirm('Вы действительно хотитие удалить категорию')
      $.ajax({
        url: url
        type: 'DELETE'
        headers: {
          'X-CSRF-Token': $('meta[name="token"]').attr('content')
        }
        success: ()->
          document.location.reload(true)
      })