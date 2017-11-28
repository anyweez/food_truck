import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {

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
              'Content-Type': 'application/json',
          },
        })
        console.log("User Logged Out");
      };

    render() {
    
        
        return (
            <div>
                <Link to='/users'><button className="logOut" onClick={ ()=> this.addFavorite()}>Add Favorite</button></Link>
                <Link to='/users'><button className="logOut">Back to Map</button></Link>
                <Link to='/'><button onClick={() => this.logOut()}>Log Out</button></Link>
             </div>
                );
    };
};



export default Nav;