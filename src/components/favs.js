import React, { Component } from 'react'
import TopFive from './top_five'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class Favs extends Component {
  getFavorites() {
  fetch(`http://desolate-lowlands-68945.herokuapp.com/user/favorites/view`), {
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }
}
  }
  
  createMarkup(xml) {
    return {
      __html: xml
    }
  }

  render() {
    let directions = this.props.instructions.map((info, index) => {
      return <div
        key={index}
        dangerouslySetInnerHTML={this.createMarkup(info)}
        className="directions"/>
    })

    // console.log(this.props.instructions);
   

    if (this.props.instructions.length === 0) {
      return (
        <div className="favs">
          <div>
            User suggested favorites
          </div>
          <TopFive/>
          {/* <Link className="link" to='/allFavs'>All</Link> */}
        </div>
      )
    } else {
      return (
        <div className="favs">
          {directions}
        </div>
      )
    }
  }
}

// connecting to Redux store below this point

function state2props(state){
  return {
    favorites: state.favorites,
    instructions: state.instructions
  }
}

function dispatch2props(dispatch) {
  return {}
}

export default connect (state2props, dispatch2props ) (Favs)
