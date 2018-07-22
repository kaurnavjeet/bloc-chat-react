import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";

var config = {
  apiKey: "AIzaSyDQ1h7AQ6d7rXV3sRQS5K4l7YhG0cyIYKw",
  authDomain: "bloc-chat-react-a30fd.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-a30fd.firebaseio.com",
  projectId: "bloc-chat-react-a30fd",
  storageBucket: "bloc-chat-react-a30fd.appspot.com",
  messagingSenderId: "251674011163"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
