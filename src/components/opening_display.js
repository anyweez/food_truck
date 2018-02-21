import React, { Component } from 'react';
import MapBox from './map_box';
import Favs from './favs';
import SignIn from './sign_in';
import Nav from './Nav';
import { Route } from 'react-router-dom';

class FirstDisplay extends Component {

  render() {
    let search = this.props.match.params.id;
    if (window.location.href.includes(search)) {
      <Route path='/' component={SignIn}/>
    }
    
    return (
      <div className="firstDisplay">
      <Nav/>
        <MapBox/>
        <Favs/>
      </div>
    )
  }
}

export default FirstDisplay;
