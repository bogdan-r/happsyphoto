module.exports = {
  show: function(req, res){
    AboutMe.find().exec((err, aboutMe)=>{
      if (err) {return res.badRequest()}
      if(aboutMe.length){
        return res.view({
          aboutMe: execToJSON(aboutMe)[0]
        })
      }else{
        AboutMe.create().exec((err, aboutMe)=> {
          return res.view({
            aboutMe: execToJSON(aboutMe)[0]
          })
        })
      }

    })
  },
  update: function(req, res){
    var params = OnlyParams(req, ['header_body', 'body', 'footer_body', 'delete_photo']);
    var fileInfo = req.file('photo');
    var isExistFile = !_.isUndefined(fileInfo._files[0]);
    var hasDeletePhoto = !_.isUndefined(params.delete_photo);

    if(isExistFile){
      params.file = fileInfo._files[0].stream.filename;
    }
    if(hasDeletePhoto){
      params.isLoadAvatar = false;
    }

    AboutMe.update({id: req.param('id')}, params).exec((err, aboutMe)=>{
      var aboutMeInstance = aboutMe[0];
      if (err) {return res.badRequest()}
      var attachmentUrl = AboutMeImage.getAttachmentsUrl().attachmentsUrlAsset + aboutMeInstance.id + '/';
      fileInfo.upload({
        dirname: attachmentUrl,
        saveAs: function(__newFileStream,cb){
          cb(null, __newFileStream.filename)
        }
      }, function (err, uploadedFiles) {
        if (err) {return res.badRequest()}
        if(uploadedFiles.length){
          aboutMeInstance.isLoadAvatar = true;
          aboutMeInstance.save(function(err){
            if (err) {return res.badRequest()}
            return res.redirect('..')
          });
        }
      })

      if(!isExistFile){
        return res.redirect('..')
      }

    })

  }
};

