module.exports = {
  create: function(req, res){
    var params = OnlyParams(req, ['name', 'email', 'subject', 'message']);

    Feedback.create(params).exec(function(err, message){
      console.log(err)
      if(err){return res.badRequest()}

      return res.json({
        status: 'ok'
      })
    })
  }
}