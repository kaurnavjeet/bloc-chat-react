import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)


  }

  userLogIn() {

  }

  render() {
    return (
      <button className="log-in" onClick={() => this.userLogIn()}>
        Log In
      </button>
    )
  }
}

export default User