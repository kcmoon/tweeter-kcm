/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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

  const tweetsData = [
  {"user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1655674535398
  }
]

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    }
  };

  renderTweets(tweetsData);

  $( "#post-tweet" ).submit(function( event ) {
    console.log($( "#post-tweet" ).serialize())
    event.preventDefault();
    $.post( "http://localhost:8080/tweets", $( "#post-tweet" ).serialize() );
  });
});

