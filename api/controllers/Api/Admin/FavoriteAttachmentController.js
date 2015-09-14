module.exports = {

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