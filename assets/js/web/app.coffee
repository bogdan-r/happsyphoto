$ ()->
  if $('.js-feedback-page').length
    new FeedbackPageView({
      el: '.js-feedback-page'
    })