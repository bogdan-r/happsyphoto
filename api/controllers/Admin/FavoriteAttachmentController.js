module.exports = {
  destroy: function(req, res){
    FavoriteAttachment.destroy({id: req.param('id')}).exec(function(err){
      if (err) {return res.badRequest()}
      return res.ok()
    })
  }
}
