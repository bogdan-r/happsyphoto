/**
 * Admin/PageController
 *
 * @description :: Server-side logic for managing Admin/pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res){
    Page.find().sort('createdAt DESC').exec(function(err, pages){
      if (err) {return res.badRequest()}
      return res.view({
        pages: pages
      })
    })
    return res.view()
  },
  new: function(req, res){
    return res.view()
  },
  edit: function(req, res){

  },
  create: function(req, res){
    var params = OnlyParams(req, ['title', 'slug', 'body']);
    Page.create(params).exec(function(err, page){
      if (err) {return res.badRequest()}
      return res.redirect('./')
    })
  },
  update: function(req, res){

  },
  destroy: function(req, res){

  }
};

