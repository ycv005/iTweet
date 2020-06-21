function tweetListLocation() {
  return document.getElementById("list-tweet");
}

function handleLikeEvent() {}

function LikeBtn(tweet) {
  return "<button onclick=handleLikeEvent() type='button' class=\"btn btn-danger m-10\">Like</button>";
}

function createTweet(tweet) {
  return (
    "<div class='row mb-5 border h-100'><p>" +
    tweet.context +
    "</p>" +
    "<div>" +
    LikeBtn(tweet) +
    "</div>" +
    "</div>"
  );
}

function listTweet() {
  var list_tweet = tweetListLocation();
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "/tweets/list";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);

  xhr.onload = function () {
    var tweets = xhr.response;
    var result = "";
    for (let i = 0; i < tweets.length; i++) {
      result += createTweet(tweets[i]);
    }
    list_tweet.innerHTML = result;
  };

  xhr.send();
}

listTweet();
