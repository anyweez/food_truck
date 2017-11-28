import React, { Component } from 'react'

class OwnerInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Position : [],
      activated: false,
    }
  }

  updateLocation() {
    this.setState({
      activated: true,
    })
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition( position => {
        fetch('https://desolate-lowlands-68945.herokuapp.com/user/start-location', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }),
          })
      })
    } else {
      /* geolocation IS NOT available */
      window.alert('current position is not available')
    }
  }

  closeShop() {
    this.setState({
      activated: false,
    })
    fetch('https://desolate-lowlands-68945.herokuapp.com/user/end-location' , {
      method: 'PATCH',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
  }

  render() {
    if (this.state.activated === false) {
      return (
        <div className="firstDisplay">
          <button className="updateLocation"
            onClick={() => this.updateLocation()} >update<br/>location
          </button>

          <img className="logoPic" alt="logo" src="../img/road_fork.png" />

          <button className="updateLocation" className="nonActive"
            onClick={() => this.closeShop()} >close<br/>shop
          </button>
        </div>
      )
    } else {
      return (
        <div className="firstDisplay">
          <button className="updateLocation" className="nonActive"
            onClick={() => this.updateLocation()} >update<br/>location
          </button>

          <img className="logoPic" alt="logo" src="../img/road_fork.png" />

          <button className="updateLocation"
            onClick={() => this.closeShop()} >close<br/>shop
          </button>
        </div>
      )
    }
  }
}

export default OwnerInterface
