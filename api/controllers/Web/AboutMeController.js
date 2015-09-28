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
  }
};

