// This jquery function tracks the characters of new tweets and warns the author of reaching the limit.
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    // access the counter to allow it to be manipulated
    const counter = $(this).next().find('output.counter');
    // tracks the character count of the new tweet
    const inputVal = $(this).val();

    counter.text(140 - inputVal.length);
   
    // adds removes class that changes color of counter
    if (inputVal.length > 140) {
      counter.addClass("negative-counter");
    }
    if (inputVal.length <= 140 && counter.hasClass('negative-counter')) {
      counter.removeClass("negative-counter");
    }
  });

});

