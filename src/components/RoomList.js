import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomValue: '',
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom(newRoomValue) {
    if (!this.state.newRoomValue) { return; }
    const newRoom = this.state.newRoomValue
    this.roomsRef.push({
      name: newRoom
    })

    this.setState({
      newRoomValue: ''
    })

  }

  handleChange(e) {
    this.setState({
      newRoomValue: e.target.value
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.rooms.map(room =>
            <li key={room.key}>
              {room.name}
            </li>
          )}
        </ul>
        <form onSubmit={(newRoomValue) =>
          this.createRoom(newRoomValue)}>
          <h4>Create new room</h4>
          <input type="text"
            placeholder="Enter a room name"
            value={this.state.newRoomValue}
            onChange={(e) => this.handleChange(e)} />
          <button type="submit">Create Room</button>
        </form>
      </div>
    );
  }
}

export default RoomList;
