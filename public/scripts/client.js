/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // creates a new tweet article 
  const createTweetElement = function(tweetData) {
    // function to prevent XSS
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const tweetHTML = `<article class="tweet">
    <header class="tweet-container-header">
      <div id="header-div">
        <img id="user-image" src="${tweetData.user.avatars}">
        <p name="user" id="user">${tweetData.user.name}</p>
      </div>
      <p name="handle" id="handle">${tweetData.user.handle}</p>
    </header>
    <div class="tweet-content">${escape(tweetData.content.text)}</div>
    <footer>
      <p name="posted-time" id="posted-time">${timeago.format(tweetData.created_at)}</p>
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
      $('#tweet-data').prepend($tweet);
    }
  };

  // stops the submit button from refreshing the page and saves data
  $( "#post-tweet" ).submit(async function( event ) {
    event.preventDefault();
    if ($('#tweet-text').val() === '') {
      return alert('Invalid Post: Post cannot be empty. Please Try Again');
    }
    if ($('#tweet-text').val().length > 140) {
      return alert('Invalid Post: Character Limit Exceeded. Please Try Again');
    }
    await $.post( "/tweets", $( "#post-tweet" ).serialize() );
    loadtweets();
    $('#tweet-text').val('');
  });

  const loadtweets = async function() {
    await $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log(data);
      renderTweets(data);
    })
     
  }
  loadtweets()
});

