import React, { Component } from 'react';
import MapBox from './map_box';
import Favs from './favs';
import SignIn from './sign_in';
import { Route } from 'react-router-dom';

class FirstDisplay extends Component {

  render() {
    let search = this.props.match.params.id;
    console.log(search + 'Hi')
    if (window.location.href.includes(search)) {
      console.log("Testing purposes");
      <Route path='/' component={SignIn}/>
    }
    
    return (
      <div className="firstDisplay">
        <MapBox/>
        <Favs/>
      </div>
    )
  }
}

export default FirstDisplay
