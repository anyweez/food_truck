import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import setVisibility from '../index';
import createBrowserHistory from 'history/createBrowserHistory';

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logOut: true,
            map: true,
            favorite: true,
        }
    }

    componentWillMount() {

        function setVisibility() {
            console.log('testing');
        }
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

        if (window.location.href === 'http://localhost:3000/') {
            console.log('We\'ll skip the logout today');
        }
        if (window.location.href.includes('/users')) {
            console.log('testing this feature');
        }
        if (window.location.href.includes('/trucks')) {
            console.log('these be trucks');
        }
        console.log(this.state.logOut);
        
        return (
            <div>
                <Link to='/users/'><button className="logOut" onClick={ ()=> this.addFavorite()}>Add Favorite</button></Link>
                <Link to='/users/'><button className="logOut">Back to Map</button></Link>
                <Link to='/'><button className="logOut" onClick={() => this.logOut()}>Log Out</button></Link>
            </div>
        );
    };
};



export default Nav;