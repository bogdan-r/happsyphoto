module.exports = function(req, res, next) {
  Category.find().exec(function(err, categories){
    if (err) {return next(err)}
    res.locals.Menus = categories;
    next();
  })
};
