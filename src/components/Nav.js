import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

class Nav extends Component {
  
    addFavorite() {
        fetch('https://desolate-lowlands-68945.herokuapp.com/favorites/add?$truck_id=${this.props.id}', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        })
    }

    logOut() {
        fetch('https://desolate-lowlands-68945.herokuapp.com/logout', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        })
        console.log("User Logged Out"); 
        console.log(this.props.userId);
      };
      

    render() {
          console.log(this.props.userId);  
        if (window.location.href.includes('/users')) {
            return (
                <div>
                    <Link to='/'><button className="nav" onClick={() => this.logOut()}>Log Out</button></Link>
                </div>
            );
        }
        else if (window.location.href.includes('/trucks')) {
            return (
                <div>
                    <Link to={`/users/${ this.props.userId }`}><button className="nav" onClick={ ()=> this.addFavorite()}>Add Favorite</button></Link>
                    <Link to={`/users/${ this.props.userId }`}><button className="nav">Back to Map</button></Link>
                    <Link to='/'><button className="nav" onClick={() => this.logOut()}>Log Out</button></Link>
                </div>
            );
        }
        else if (window.location.pathname === '/' || window.location.href.includes('register')) {
            return (
                <div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Link to='/users/'><button className="nav">Back to Map</button></Link>
                    <Link to='/'><button className="nav" onClick={() => this.logOut()}>Log Out</button></Link>
                </div>
            );
        }
    };
};

function state2props(state){
    return {
      userId: state.userId
    }
  }

export default connect (state2props, null)(Nav);