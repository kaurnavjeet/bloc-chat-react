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
      console.log(room)
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom(e) {
    e.preventDefault();
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
      <div className="rooms">

        {this.props.user ?
          <div className="room-content">
            <ul>
              {this.state.rooms.map((room) =>
                <li key={room.key} onClick={() =>
                  this.props.changeActiveRoom(room)} style={{ fontWeight: this.props.activeRoom === room ? 'bold' : "500" }}>
                  {room.name}
                </li>
              )}
            </ul>


            <form onSubmit={(e) =>
              this.createRoom(e)}>
              <h4>Create new room</h4>
              <input type="text"
                placeholder="Enter a room name"
                value={this.state.newRoomValue}
                onChange={(e) => this.handleChange(e)} />
              <button type="submit">Create Room</button>
            </form>
          </div>
          : <div><h3>Please log in to view rooms</h3></div>
        }
      </div>
    );
  }
}

export default RoomList;
