console.log("calling xhr");
const xhr = new XMLHttpRequest();
const method = "GET";
const url = "/tweets";
const responseType = "json";
xhr.responseType = responseType;
xhr.open(method, url);
xhr.onload = function () {
  console.log(xhr.response);
};
xhr.send();
