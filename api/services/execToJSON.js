module.exports = function(modelsCollections){
    var outputCollection = []
    for(var i = 0; i < modelsCollections.length; i++){
      outputCollection.push(modelsCollections[i].toJSON());
    }
    return outputCollection
  }