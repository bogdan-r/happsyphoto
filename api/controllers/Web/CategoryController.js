module.exports = {
  show: function (req, res) {
    var params = OnlyParams(req, ['slug']);
    Category.findOne({slug: params.slug}).populate('galleries', {sort: 'coverImg ASC'}).then(function (category) {
      var coverImgsId = _.pluck(category.galleries, 'coverImg')

      return [category, Attachment.find(coverImgsId).sort('id')]

    }).spread(function (category, coverImgs) {

        _.each(category.galleries, function(item, i){
          item.coverImg = coverImgs[i].toJSON();
        })

        res.view({
          category: category.toJSON()
        })
      }).catch(function (err) {
        if (err) {
          return res.badRequest()
        }
      })
  }
}