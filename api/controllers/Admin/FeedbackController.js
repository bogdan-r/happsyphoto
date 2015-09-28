module.exports = {
  index: function(req, res){
    var params = OnlyParams(req, ['isReading']);
    if(_.isUndefined(params.isReading)){
      params.isReading = false;
    }
    PaginationService.paginate(Feedback, req).then(function(pagResult){
      Feedback.find({isReading: params.isReading}).sort('createdAt DESC').paginate(pagResult).exec(function(err, feedMessages){
        if (err) {return res.badRequest()}
        return res.view({
          feedbacks: feedMessages,
          pagResult: pagResult,
          isReadingPart: JSON.parse(params.isReading)
        })
      })
    })

  },
  show: function(req, res){
    Feedback.findOne(req.param('id')).exec(function(err, feedMessage){
      if (err) {return res.badRequest()}
      if(feedMessage.isReading){
        return res.view({
          feedback: feedMessage
        })
      }else{
        feedMessage.isReading = true;
        feedMessage.save(function(err){
          if (err) {return res.badRequest()}
          return res.view({
            feedback: feedMessage
          })
        })
      }

    })
  }
}