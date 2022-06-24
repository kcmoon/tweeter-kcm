/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// when page loads
$(document).ready(function() {
  loadtweets();
  $('#post-tweet').hide();

  // changes cursor when hovering over "WRITE a new tweet"
  $('.nav-container').on('mouseover', function() {
    $('.nav-container').css('cursor', 'pointer');
  });
  
  // creates a slide-down and slide-up feature for new tweets
  $('.nav-container').on('click', function() {
    if ($('#post-tweet').is(':visible')) {
      $('#post-tweet').slideUp();
    } else {
      $('#post-tweet').slideDown();
      $('#tweet-text').focus();
    }
  });

  // stops the submit button from refreshing the page and saves data && includes slide-down error features for invalid tweets
  $("#post-tweet").submit(async function(event) {
    event.preventDefault();
    $('#error').slideUp();
    if ($('#tweet-text').val() === '') {
      errorMessage('⚠️ Invalid Tweet: Tweet Must Contain Content. Please try again. ⚠️');
      return false;
    } else if ($('#tweet-text').val().length > 140) {
      errorMessage('⚠️ Invalid Tweet: Character Limit Exceeded Please try again. ⚠️');
      return false;
    } else await $.post("/tweets", $("#post-tweet").serialize());
    loadtweets();
    $('#tweet-text').val('');
    $('.counter').text(140);
  });

});

