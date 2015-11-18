module.exports = function(additionParam, options){
  var extParams = null;
  if(_.isObject(options) && !_.isEmpty(options)){
    extParams = _.extend(options, additionParam);
  }else{
    extParams = additionParam;
  }
  return extParams;
}