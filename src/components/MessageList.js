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
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(message)
      this.setState({
        messages: this.state.messages.concat(message)
      });
    })
  }

  render() {

    return (
      <div className="displayMessage">
        <ul>
          {this.state.messages.map(message =>

            <li key={message.key}>
              {this.props.activeRoom.key === message.roomID ? message.content : null}
            </li>

          )}
        </ul>
      </div>
    )
  }
}

export default MessageList;