import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class TopFive extends Component {

  render() {

    let favs = <div></div>
console.log(this.props.favorites + "Here we go");
    if (this.props.favorites === undefined) {
      return favs
    } else {
      favs = this.props.favorites.slice(0,3).map((fav, index) => {
        return (

          <Link key={fav.yelpId} to={`/trucks/${fav.yelpId}`}>
          <p className="link">
            {fav.name}
          </p>
          </Link>
        )
      })
    }

    return (
      <div className="topFive">
        {favs}
      </div>
    );
  }
}

// connecting to the redux store below this point

function state2props(state){
  return {
    favorites: state.favorites,
  }
}

function dispatch2props(dispatch) {
  return {
  }
}

export default connect (state2props, dispatch2props ) (TopFive)
