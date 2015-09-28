class FeedbackPageView extends Backbone.View

  initialize: ->
    @formMessageTimeout = null
    $('.js-feedback-form').on('ajax:success', (event, data, status, xhr)->
      $form = $(this)
      $form.find('input[type=text], input[type=email], textarea').val('')
      $form.find('.js-feedback-message').text('Сообщение отправленно').css('opacity', '1')
      clearTimeout(@formMessageTimeout)
      setTimeout(->
        $form.find('.js-feedback-message').css('opacity', '0').text('')
      , 10000)
    ).on('ajax:error', ()->
      $form = $(this)
      $form.find('.js-feedback-message').text('Что то пошло не так, попробуйте снова').css('opacity', '1')
      clearTimeout(@formMessageTimeout)
      setTimeout(->
        $form.find('.js-feedback-message').css('opacity', '0').text('')
      , 10000)
    )