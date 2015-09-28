module.exports = {

  find: function(req, res){
    FavoriteAttachment.find().then(function(favoriteAttachments){
      var attachmentIds = _.pluck(favoriteAttachments, 'attachment')
      var params = {}
      if(attachmentIds.length){
        params = {id: {'!' : attachmentIds}}
      }
      return Attachment.find(params)
    }).then(function(attachment){
      return res.json(attachment)
    }).catch(function(err){
      console.log(err)
      if(err){return res.badRequest()}
    })
  },

  create: function(req, res){
    var params = OnlyParams(req, ['attachments']);
    var attachmentsItems = _.map(params.attachments.id, function(item){
      return {attachment: item}
    });
    FavoriteAttachment.create(attachmentsItems).exec(function(err, attachments){
      if(err){return res.badRequest()}
      return res.json(attachments)
    })
  }
}