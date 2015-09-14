/**
 * Admin/CategoryController
 *
 * @description :: Server-side logic for managing Admin/categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var tr = require('transliteration');
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
    Category.findOne({id: req.param('id')}).exec(function(err, category){
      if (err) {return res.badRequest()}
      res.view({
        category: category.toJSON()
      })
    })
  },
  create: function(req, res){
    var params = OnlyParams(req, ['name']);
    Category.create(params).exec(function(err, category){
      console.log(err)
      if (err) {return res.badRequest()}
      return res.redirect('./')
    })
  },
  update: function(req, res){
    var params = OnlyParams(req, ['id', 'name']);
    Category.update({id: req.param('id')}, params).exec(function(err){
      if (err) {return res.badRequest()}
      return res.redirect('..')
    })
  },
  destroy: function(req, res){
    Category.destroy({id: req.param('id')}).exec(function(err){
      if (err) {return res.badRequest()}
      return res.ok()
    })
  }
};

