(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{12:function(e,t,a){},13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(6),o=a.n(c),s=(a(12),a(13),a(4)),l=a(1);function i(e){var t,a=Object(n.useState)([]),c=Object(l.a)(a,2),o=c[0],i=c[1],m=r.a.createRef();return r.a.createElement("div",null,r.a.createElement("form",{className:"my-5",onSubmit:function(e){e.preventDefault();var a=m.current.value;(t=Object(s.a)(o)).unshift({context:a,likes:0,id:2323}),i(t),m.current.value=""}},r.a.createElement("div",{className:"form-group"},r.a.createElement("textarea",{ref:m,required:!0,className:"form-control"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Tweet Now"))),r.a.createElement(u,{newTweets:o}))}function u(e){var t=Object(n.useState)([]),a=Object(l.a)(t,2),c=a[0],o=a[1],i=Object(n.useState)([]),u=Object(l.a)(i,2),m=u[0],f=u[1];return Object(n.useEffect)((function(){var t=Object(s.a)(e.newTweets).concat(c);t.length!==m.length&&f(t)}),[e.newTweets,m,c]),Object(n.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://localhost:8000/api/tweets/list"),t.onload=function(){e(t.response,t.status)},t.onerror=function(t){e({message:"some error"},400)},t.send()}((function(e,t){200===t?o(e):(console.log("possibly you didn't start the django server"),alert("There was an error, ok-",t))}))}),[]),m.map((function(e,t){return r.a.createElement(p,{tweet:e,className:"my-5 py-5 border bg-white col-10",key:t})}))}function m(e){var t=e.tweet,a=e.action,c=Object(n.useState)(t.likes),o=Object(l.a)(c,2),s=o[0],i=o[1],u=Object(n.useState)(!0===t.userLike),m=Object(l.a)(u,2),p=m[0],f=m[1],d="like"===a.type?"".concat(s," Likes"):"".concat(a.display);return r.a.createElement("button",{onClick:function(e){e.preventDefault(),"like"===a.type&&(!1===p?(f(!0),i(s+1)):(f(!1),i(s-1)))},className:"btn btn-primary"},d)}function p(e){var t=e.tweet,a=e.className;return r.a.createElement("div",{className:a},r.a.createElement("p",{className:"text-dark"},t.context),r.a.createElement("div",{className:"btn btn-group"},r.a.createElement(m,{tweet:t,action:{type:"like",display:"Likes"}}),r.a.createElement(m,{tweet:t,action:{type:"unlike",display:"Unlike"}}),r.a.createElement(m,{tweet:t,action:{type:"retweet",display:"Retweet"}})))}var f=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("div",null,r.a.createElement(i,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,a){e.exports=a(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.4756ceed.chunk.js.map