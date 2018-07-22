import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList.js";

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
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
