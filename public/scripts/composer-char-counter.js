$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    // let counter = $('.counter') <= this traverses the whole document !! AVOID IF POSSIBLE
    const counter = $(this).next().find('output.counter');
    const inputVal = $(this).val();

    counter.text(140-inputVal.length);
   
    if (inputVal.length > 140) {
      counter.addClass("negative-counter")
    }
    if (inputVal.length <= 140 && counter.hasClass('negative-counter')) {
      counter.removeClass("negative-counter")
    }
  })

});