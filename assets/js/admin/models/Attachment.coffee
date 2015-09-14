class HappsyApp.Models.Attachment extends Backbone.Model


class HappsyApp.Collections.Attachments extends Backbone.Collection
  url: '/api/admin/attachment'
  model: HappsyApp.Models.Attachment