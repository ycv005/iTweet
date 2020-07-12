function lookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const xhr = new XMLHttpRequest();
  // const url = `http://localhost:8000/api/tweets/list`;
  const url = `http://localhost:8000${endpoint}`;
  xhr.responseType = "json";
  const csrftoken = getCsrfCookie("csrftoken");
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  if (csrftoken) {
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
  }

  xhr.onload = function () {
    console.log(`here is the response- ${xhr.response} and status- ${xhr.status}`)
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    callback({ message: "some error" }, 400);
  };
  xhr.send(jsonData);
}

export function listTweet(callback) {
  lookup("GET", "/api/tweets/list", callback);
}

export function createTweet(newTweet, callback) {
  console.log("calling create tweet")
  lookup("POST", "/api/tweets/create", callback, { "content": newTweet });
}

function getCsrfCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
