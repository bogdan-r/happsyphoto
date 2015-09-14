module.exports = function(req, params){
  var outputParams = {};
  if(!_.isArray(params)){
    return outputParams
  }
  for(var i = 0; i < params.length; i++){
    if(!_.isUndefined(req.param(params[i]))){
      outputParams[params[i]] = req.param(params[i])
    }

  }
  return outputParams
}