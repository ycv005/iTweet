import React, { useEffect, useState } from "react";
import { createTweet, listTweet } from "../lookup/index.js";

export function TweetComponent(props) {
  console.log("here is the tweet componenet");
  const [newTweets, setNewTweets] = useState([]);
  const textAreaRef = React.createRef();
  var tempTweet;
  const handleSubmit = (event) => {
    console.log("handing submit tweet");
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    tempTweet = [...newTweets];
    createTweet(newVal, (response, status) => {
      if (status === 201) {
        console.log(`${status} in the create tweeet`);
        tempTweet.unshift(response);
      }
      else {
        alert("Error occured while posting tweet");
        console.log(response);
      }
    })
    setNewTweets(tempTweet);
    textAreaRef.current.value = "";
  };
  return (
    <div>
      <form className="my-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            ref={textAreaRef}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Tweet Now
          </button>
        </div>
      </form>
      <TweetsList newTweets={newTweets} />
    </div>
  );
}

export function TweetsList(props) {
  console.log("calling tweet list")
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [tweetsDidSet, setTweetsDidSet] = useState(false);
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweets, tweetsInit]);
  useEffect(() => {
    if (tweetsDidSet === false) {
      const myCallback = (response, status) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          console.log("possibly you didn't start the server");
          alert("There was an error, ok-", status);
        }
      };
      listTweet(myCallback);
    }
  }, [setTweetsInit, tweetsDidSet, setTweetsDidSet]);
  return tweets.map((tweet, index) => {
    return (
      <Tweet
        tweet={tweet}
        className="my-5 py-5 border bg-white col-10"
        key={index}
      />
    );
  });
}

export function ActionBtn(props) {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes);
  const [justClicked, setJustClicked] = useState(
    tweet.userLike === true ? true : false
  );
  const handleClick = (event) => {
    event.preventDefault();
    if (action.type === "like") {
      if (justClicked === false) {
        setJustClicked(true);
        setLikes(likes + 1);
      } else {
        setJustClicked(false);
        setLikes(likes - 1);
      }
    }
  };

  const display =
    action.type === "like" ? `${likes} Likes` : `${action.display}`;
  return (
    <button onClick={handleClick} className="btn btn-primary">
      {display}
    </button>
  );
}

export function Tweet(props) {
  const tweet = props.tweet;
  const className = props.className;
  return (
    <div className={className}>
      <p className="text-dark">{tweet.context}</p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
}
