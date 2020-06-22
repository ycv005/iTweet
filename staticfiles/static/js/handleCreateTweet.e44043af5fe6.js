function handleSubmit(event) {
  event.preventDefault();
  const myForm = event.target;
  const myFormData = new FormData(myForm);
  const url = myForm.getAttribute("action");
  const method = myForm.getAttribute("method");
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open(method, url);
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onload = function () {
    if (xhr.status === 201) {
      var tweetElement = xhr.response;
      tweetElement = createTweet(tweetElement);
      var all_tweets = tweetListLocation();
      all_tweets.innerHTML = tweetElement + all_tweets.innerHTML;
      myForm.reset();
    } else if (xhr.status === 400) {
      const errorJson = xhr.response;
      console.log("handlding error func", errorJson);
      alert("Bad request-", errorJson["context"]);
    } else if (xhr.status === 403) {
      alert("You need to login");
      window.location.href = "/accounts/login";
    } else if (xhr.status >= 500) {
      console.log(xhr.status);
      alert("Server Error, Please Try again-", xhr.status);
    }
  };
  xhr.onerror = function (error) {
    alert("Error Occured: ", error);
  };
  xhr.send(myFormData);
}

const TweetForm = document.getElementById("tweet-create-form");

TweetForm.addEventListener("submit", handleSubmit);
