// function to prevent XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creates slide-down error messages
const errorMessage = function(text) {
  let slideDownErr = `<div id="error">${text}</div>`;
  $('.tweet-container').prepend(slideDownErr).hide().slideDown();
};

 // loads all tweets at bottom of page in reverse chronologically order
const loadtweets = async function() {
  await $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
};

// renders the tweets in reverse chronological order
 const renderTweets = function(tweets) {
  $('#tweet-data').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-data').prepend($tweet);
  }
};

// creates a new tweet with all html - css in tweet container
const createTweetElement = function(tweetData) {
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
  </article>`;
  
  return tweetHTML;
};