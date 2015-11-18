/**
 * Admin/WelcomeController
 *
 * @description :: Server-side logic for managing Admin/welcomes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
    FavoriteAttachment.find().populate('attachment').exec(function(err, favoriteAttachment){
      if(err){return res.badRequest()}
      var favoriteAttachmentByActive = AttachmentService.filterByActive(favoriteAttachment, 'attachment');
      return res.view({
        favoriteAttachment: execToJSON(favoriteAttachmentByActive)
      })
    })
  }
};

