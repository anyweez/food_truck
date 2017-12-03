import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
    }
  }

  logIn() {
    fetch('https://desolate-lowlands-68945.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            userName: this.state.name,
            password: this.state.password,
        }),
      }).then( res => res.json())
  // This section checks the response body to push user to correct location
      .then(res => {
        if (res.userType === 'owner') {
          this.props.history.push('/owner')
        } else if (res.userType === 'customer') {
          this.props.history.push('/users/')
  // This section checks the response body to push user to correct location
          }
      })
  }

  newUser() {
    this.props.history.push('/register')
  }

  handleChange(state, ev) {
   this.setState({
     [state] : ev.target.value,
   })
 }

  render() {
    return (
      <div className="signIn">

        <img className="logoPic" alt="logo" src="../img/road_fork.png" />

        <input onChange={ ev => this.handleChange('name', ev)}
          type="text" value={this.state.name} placeholder="username"/>

        <input onChange={ ev => this.handleChange('password', ev)}
          type="password" value={this.state.password} placeholder="password"/>

        <button className="submit"
          onClick={() => this.logIn()}>log in
        </button>

        <button className="submit"
          onClick={() => this.newUser()}>register
        </button>

      </div>
    );
  };
};

export default SignIn;
