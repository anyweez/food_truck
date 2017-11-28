import React, { Component } from 'react';
import { goButton } from './fav_info_details';
import {logOut } from './header';
class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
    <button className="logOut"
    onClick={ ()=> this.goButton()}>Favorite</button>
    <button onClick={() => this.logOut()}>Log Out</button>
    <button className="logOut"
          onClick={ ()=> this.goButton()}>Back to Map</button>
    </div>
        );
    };
};



export default Nav;