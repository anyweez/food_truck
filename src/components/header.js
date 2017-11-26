import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {

  logOut() {
  fetch('https://desolate-lowlands-68945.herokuapp.com/logout', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
  })
};


  render() {
    return (
      <div className="header">
        <p className="headerPtag">Fork in the Road</p>
        <Link to='/'><button onClick={() => this.logOut()}>Log Out</button></Link>
      </div>
    );
  }
}

export default Header;
