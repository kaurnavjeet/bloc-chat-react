import React, { Component } from 'react'


class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }

    this.messagesRef = this.props.firebase.database().ref("Messages");
  }



  componentDidMount() {

    console.log('--component mounted--')

    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(message)
      this.setState({
        messages: this.state.messages.concat(message)
      });
    })
  }

  displayMessage(message) {
    return (
      this.props.activeRoom.key === message.roomID ?
        <li>{message.content}</li>
        : null
    )
  }

  render() {

    return (
      <div className="displayMessage">
        {this.state.messages.map(message =>
          <ul key={message.key}>
            {this.displayMessage(message)}
          </ul>
        )}
      </div>
    )
  }
}

export default MessageList;