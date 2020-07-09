export function listTweet(callback) {
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/api/tweets/list";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);

  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    callback({ message: "some error" }, 400);
  };
  xhr.send();
}
