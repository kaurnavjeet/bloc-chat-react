import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList.js";
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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
  constructor(props) {
    super(props)

    this.state = {
      activeRoom: '',
      user: null,
    }
  }

  changeActiveRoom(room) {
    this.setState({
      activeRoom: room
    })
  }

  setUser(user) {
    this.setState({
      user: user,
      activeRoom: ''
    })
  }

  render() {

    return (
      <div className="App">
        <RoomList firebase={firebase}
          activeRoom={this.state.activeRoom}
          changeActiveRoom={(room) => this.changeActiveRoom(room)}
          user={this.state.user}
        />
        <MessageList firebase={firebase}
          activeRoom={this.state.activeRoom}
        />
        <User firebase={firebase}
          setUser={(user) => this.setUser(user)}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
