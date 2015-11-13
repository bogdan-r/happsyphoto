$ ()->
  if $('.js-feedback-page').length
    new FeedbackPageView({
      el: '.js-feedback-page'
    })

  $('.js-swiper').swiper({
    preloadImages: false
    lazyLoading: true
    lazyLoadingOnTransitionStart: true
    watchSlidesVisibility: true
    slidesPerView: 'auto'
    spaceBetween: 30
    prevButton: '.js-swiper-prev'
    nextButton: '.js-swiper-next'
    ###freeMode: true
    freeModeSticky: true###
    mousewheelControl: true
    onInit: (swiper)->
      swiper.update()
    onLazyImageReady: (swiper)->
      swiper.update()


  })