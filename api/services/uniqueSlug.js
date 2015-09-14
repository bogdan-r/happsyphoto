var tr = require('transliteration');
var async = require('async')

module.exports = function(model, values, next){
  var counter = 1;
  var hasGoOn = true;
  values.slug = tr.slugify(values.name);

  async.whilst(function(){
    return hasGoOn
  }, function(callback){
    counter++
    model.findOne({slug: values.slug}).then(function(modelResult){
      if(_.isUndefined(modelResult)){
        hasGoOn = false
      }else{
        values.slug = tr.slugify(values.name) + '_' + counter.toString()
      }
      callback()
    })

  }, function(err){
    next()
  })


}