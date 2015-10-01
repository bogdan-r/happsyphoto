class FavoriteItemView extends Backbone.View

  template : JST['assets/templates/admin/attachment/favorite_item.html']

  className: 'favorite-list__item'

  render: ()->
    this.$el.html(this.template(this.model.toJSON()));

    return this