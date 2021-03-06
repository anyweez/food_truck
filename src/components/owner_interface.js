import React, { Component } from 'react'

class OwnerInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Position : [],
      activated: false,
      foodType: '',
      special1: '',
      special1_description: '',
      special2: '',
      special2_description: '',
      special3: '',
      special3_description: '',
      
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

addSpecials()  {
  fetch(`https://desolate-lowlands-68945.herokuapp.com/user/special/add`), {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
        name: this.state.special1,
        description: this.state.special1_description,
    }),
  }
}

setSpecials(state, ev) {
  this.setState({
    [state] : ev.target.value,
  }), console.log(this.state);
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

  ownerProfile(state, ev) {
    this.setState({
      [state] : ev.target.value,
    })  
  };
  
  updateProfile() {
    // need to add the post for the profile once the route is made.
    console.log("Working");
  }

  render() {
    if (this.state.activated === false) {
      return (
        <div className="firstDisplay">
          <button className="updateLocation"
            onClick={() => this.updateLocation()} >Set new<br/>location
          </button>
          <input onChange={ ev => this.setSpecials('foodType', ev)}
            type="text" value={this.state.foodType} className="menu" placeholder="FoodType"/>
          <input onChange={ ev => this.setSpecials('special1', ev)}
            type="text" value={this.state.special1} placeholder="First Special"/>
            <textarea cols="50" rows="3" onChange={ ev => this.setSpecials('special1_description', ev)}
             value={this.state.special1_description} placeholder="Enter Description"/>
          <input onChange={ ev => this.setSpecials('special2', ev)}
            type="text" value={this.state.special2} placeholder="Second Special"/>
          <textarea cols="50" rows="3" onChange={ ev => this.setSpecials('special2_description', ev)}
             value={this.state.special2_description} placeholder="Enter Description"/>
          <input onChange={ ev => this.setSpecials('special3', ev)}
            type="text" value={this.state.special3} placeholder="Third Special"/>
          <textarea cols="50" rows="3" onChange={ ev => this.setSpecials('special3_description', ev)}
             value={this.state.special3_description} placeholder="Enter Description"/>
          <button className="submit" onClick={() => this.addSpecials()} type="submit">Submit</button>
          {/* <img className="logoPic" alt="logo" src="../img/road_fork.png" /> */}
          <button className="updateLocation" className="nonActive"
            onClick={() => this.closeShop()} >End<br/>day</button>
        </div>
        
      )
    } else {
      return (
        <div className="firstDisplay">
          <button className="updateLocation" className="nonActive"
            onClick={() => this.updateLocation()} >Set New<br/>location
          </button>

          <img className="logoPic" alt="logo" src="../img/road_fork.png" />

          <button className="updateLocation"
            onClick={() => this.closeShop()} >End<br/>day
          </button>
        </div>
      )
    }
  }
}

export default OwnerInterface
