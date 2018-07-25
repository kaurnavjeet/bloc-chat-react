import React, { Component } from 'react'



class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      value: '',
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
    console.log(this.state.messages)
  }

  displayMessage(message) {
    return (
      this.props.activeRoom.key === message.roomID ?
        <li>{message.content} by {message.username}</li>
        : null
    )
  }


  createMessage(e) {
    e.preventDefault();
    if (!this.state.value) { return; }
    const newMessage = this.state.value
    this.messagesRef.push({
      content: newMessage,
      roomID: this.props.activeRoom.key,
      username: this.props.user.displayName,
      sentAt: this.timeStamp()
    })

    this.setState({
      value: ''
    })

  }

  confirmActiveRoom(message) {
    return (
      this.props.activeRoom.key === message.roomID ?
        this.createMessage()
        : null
    )
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  timeStamp() {
    let date = new Date();

    let zero = function (val) {
      return val < 9 ? '0' + val : '' + val;
    }

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let amPm = '';

    let ampm = Math.floor(hour)
    if (ampm > 12) {
      amPm = "PM"
      hour = ampm - 12;
    } else if (ampm === 0) {
      hour = "12";
    }


    return '' + year + '-' + zero(month) + '-' + zero(day) + ' ' + zero(hour) + ':' + zero(min) + ' ' + amPm;
  }


  render() {

    return (
      <div className="displayMessage">
        <div className="messages">
          {this.state.messages.map(message =>
            <ul key={message.key}>
              {this.displayMessage(message)}
            </ul>
          )}
        </div>

        <div className="message-input">
          {this.props.activeRoom.key !== this.state.messages.roomID ?
            <form className="new-message" onSubmit={(e) => this.createMessage(e)} >
              <input type="text" placeholder="Write your message here" value={this.state.value}
                onChange={(e) => this.handleChange(e)} />
              <button className="submit">Send</button>
            </form>
            : null}
        </div>

      </div>
    )
  }
}

export default MessageList;