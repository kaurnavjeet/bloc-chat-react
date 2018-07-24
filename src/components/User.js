import React, { Component } from 'react';

class User extends Component {

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider()
    this.props.firebase.auth().signInWithPopup(provider)
  }

  signOut() {
    this.props.firebase.auth().signOut()
  }

  componentDidMount(user) {

    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      console.log(user)
    })

  }


  render() {

    return (
      <div>
        {this.props.user ?
          <button onClick={() => this.signOut()}>
            Log Out
          </button>
          :
          <button onClick={() => this.signIn()}>Log In</button>
        }

        {this.props.user ? this.props.user.displayName : null}
      </div>
    )
  }
}

export default User