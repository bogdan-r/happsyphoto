/**
 * Admin/WelcomeController
 *
 * @description :: Server-side logic for managing Admin/welcomes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
    FavoriteAttachment.find().populateAll().exec(function(err, favoriteAttachment){
      console.log(err)
      if(err){return res.badRequest()}
      return res.view({
        favoriteAttachment: execToJSON(favoriteAttachment)
      })
    })
  }
};

