class HappsyApp.Models.FavoriteAttachment extends Backbone.Model


class HappsyApp.Collections.FavoriteAttachment extends Backbone.Collection
  url: '/api/admin/favorite_attachment'
  model: HappsyApp.Models.FavoriteAttachment
