// function tweetListLocation() {
//   return document.getElementById("list-tweet");
// }

// function handleTweetAction(id, like, action) {
//   const url = "tweets/action";
//   const method = "POST";
//   var data = {
//     id: id,
//     action: action,
//   };
//   data = JSON.stringify(data);
//   console.log("data to be send-", data);
//   const csrftoken = getCsrfCookie("csrftoken");
//   const xhr = new XMLHttpRequest();
//   xhr.open(method, url);
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
//   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//   xhr.setRequestHeader("X-CSRFToken", csrftoken);

//   xhr.onload = function () {
//     // will handle later on with the react js
//     listTweet();
//   };
//   xhr.send(data);
// }

// function ReTweetBtn(tweet) {
//   return (
//     '<button onclick="handleTweetAction(' +
//     tweet.id +
//     "," +
//     tweet.likes +
//     ", 'retweet')\" type='button' class='btn btn-outline-primary m-10'>Retweet</button>"
//   );
// }

// function LikeBtn(tweet) {
//   return (
//     '<button onclick="handleTweetAction(' +
//     tweet.id +
//     "," +
//     tweet.likes +
//     ", 'like')\" type='button' class='btn btn-danger m-10'>" +
//     tweet.likes +
//     " Like</button>"
//   );
// }

// function UnLikeBtn(tweet) {
//   return (
//     '<button onclick="handleTweetAction(' +
//     tweet.id +
//     "," +
//     tweet.likes +
//     ", 'unlike')\" type='button' class='btn btn-outline-danger m-10'>Unlike</button>"
//   );
// }

// function createTweet(tweet) {
//   return (
//     "<div class='row mb-5 border h-100'><p>" +
//     tweet.context +
//     "</p>" +
//     "<div>" +
//     LikeBtn(tweet) +
//     UnLikeBtn(tweet) +
//     ReTweetBtn(tweet) +
//     "</div>" +
//     "</div>"
//   );
// }

// function listTweet() {
//   var list_tweet = tweetListLocation();
//   const xhr = new XMLHttpRequest();
//   const method = "GET";
//   const url = "api/tweets/list";
//   const responseType = "json";
//   xhr.responseType = responseType;
//   xhr.open(method, url);

//   xhr.onload = function () {
//     var tweets = xhr.response;
//     var result = "";
//     for (let i = 0; i < tweets.length; i++) {
//       result += createTweet(tweets[i]);
//     }
//     list_tweet.innerHTML = result;
//   };

//   xhr.send();
// }

// listTweet();
