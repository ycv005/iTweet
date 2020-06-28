function tweetListLocation() {
  return document.getElementById("list-tweet");
}

function handleLikeEvent(id, like) {
  console.log(id, like);
  const url = "tweets/action";
  const method = "POST";
  const data = JSON.stringify({
    id: id,
    action: "like",
  });
  const xhr = XMLHttpRequest();
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  // xhr.setRequestHeader("X-CSRFToken",` "HTTP_X_CSRFTOKEN");
  xhr.open(method, url);
  xhr.onload = function () {
    console.log(xhr.status, xhr.response);
  };
  xhr.send(data);
}

function LikeBtn(tweet) {
  return (
    "<button onclick=handleLikeEvent(" +
    tweet.id +
    "," +
    tweet.likes +
    ") type='button' class='btn btn-danger m-10'>" +
    tweet.id +
    "Like</button>"
  );
}

function createTweet(tweet) {
  console.log("here is teh tweet obj- ${tweet}");
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
  console.log("listing out tweet");
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
