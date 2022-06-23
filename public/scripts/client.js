/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // creates a new tweet article 
  const createTweetElement = function(tweetData) {
    const tweetHTML = `<article class="tweet">
    <header class="tweet-container-header">
      <div id="header-div">
        <img id="user-image" src="${tweetData.user.avatars}">
        <p name="user" id="user">${tweetData.user.name}</p>
      </div>
      <p name="handle" id="handle">${tweetData.user.handle}</p>
    </header>
    <div class="tweet-content">${tweetData.content.text}</div>
    <footer>
      <p name="posted-time" id="posted-time">${tweetData.created_at}</p>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
      </footer>
    </article>`
    
    return tweetHTML;
  }


  // renders all tweets at bottom of page
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    }
  };

  // stops the submit button from refreshing the page and saves data
  $( "#post-tweet" ).submit(function( event ) {
    console.log($( "#post-tweet" ).serialize())
    event.preventDefault();
    $.post( "/tweets", $( "#post-tweet" ).serialize() );
  });

  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log(data);
      renderTweets(data);
    })
     
  }
  loadtweets()
});

