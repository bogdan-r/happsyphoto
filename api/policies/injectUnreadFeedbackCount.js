module.exports = function(req, res, next) {
  Feedback.count({isReading: false}).exec(function(err, feedbackCount){
    if (err) {return next(err)}
    res.locals.feedbackCount = feedbackCount;
    next();
  })
};
