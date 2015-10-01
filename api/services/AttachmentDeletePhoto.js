'use strict'
var fs = require('fs-extra')
var AttachmentImages = require('./AttachmentImages')

module.exports = function(ids){
  var promList = []
  for(let i = 0; i < ids.length; i++){
    var pathToDelete = `${AttachmentImages.getAttachmentsUrl().attachmentsUrlAsset}${ids[i]}/`;
    var fsPromise = new Promise((resolve, reject)=>{
      fs.remove(pathToDelete, (err)=>{
        if(err){
          reject(err)
        }else{
          resolve()
        }
      })
    })

    promList.push(fsPromise)
  }

  return Promise.all(promList)
}