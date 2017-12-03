import React, { Component } from 'react';
import MapBox from './map_box';
import Favs from './favs';
import setVisibility from '../index';

class FirstDisplay extends Component {
  componentWillMount() {
    let url = window.location.href;
      url.includes('users');
        if (url.includes('users') === true) {
            console.log('show button')
            setVisibility();
        }

  }


  render() {

    
    return (
      <div className="firstDisplay">
        <MapBox/>
        <Favs/>
      </div>
    )
  }
}

export default FirstDisplay
