/**
 * Admin/CategoryController
 *
 * @description :: Server-side logic for managing Admin/categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    PaginationService.paginate(Category, req).then(function(pagResult){
      Category.find().sort('createdAt DESC').paginate(pagResult).exec(function(err, categories){
        if (err) {return res.badRequest()}
        return res.view({
          categories: execToJSON(categories),
          pagResult: pagResult
        })
      })
    })
  },
  new: function(req, res){
    res.view()
  },
  edit: function(req, res){

  },
  create: function(req, res){
    console.log('sdfsdfsdf')
    var params = {
      name: req.param('name')
    }
    Category.create(params).exec(function(err, category){
      if (err) {return res.badRequest()}
      return res.redirect('./')
    })
  },
  update: function(req, res){

  },
  destroy: function(req, res){
    console.log('sdfdsfsdfsd')
    Category.destroy({id: req.param('id')}).exec(function(err){
      if (err) {return res.badRequest()}
      return res.redirect('./')
    })
  }
};

