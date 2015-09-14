module.exports = {
  find: function(req, res){
    Attachment.findByActiveState().exec(function(err, attachments){
      if(err){return res.badRequest()}
      return res.json(attachments)
    })
  }
}