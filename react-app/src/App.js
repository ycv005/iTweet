import React from "react";
import "./App.css";
import { TweetComponent } from "./tweets/index.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetComponent />
        </div>
      </header>
    </div>
  );
}

export default App;
