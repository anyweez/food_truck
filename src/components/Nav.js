import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

class Nav extends Component {
    constructor(props) {
        super(props)
    }
    addFavorite() {
        fetch('https://desolate-lowlands-68945.herokuapp.com/favorites?id=${this.props.match.params.id}', {
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
      };

    render() {
        const history = createBrowserHistory({
        forceRefresh: true,
        });      
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
                    <Link to='/users/'><button className="nav" onClick={ ()=> this.addFavorite()}>Add Favorite</button></Link>
                    <Link to='/users/'><button className="nav">Back to Map</button></Link>
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

export default Nav;