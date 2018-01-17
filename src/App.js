import React, { Component } from 'react';
import Header from './components/header';
import Nav from './components/Nav';
import FirstDisplay from './components/opening_display';
import AllFavs from './components/all_favs';
import TruckInfo from './components/fav_info_details';
import SignIn from './components/sign_in';
import RegisterUser from './components/register_user';
import OwnerInterface from './components/owner_interface';
import { Route, Switch, withRouter } from 'react-router-dom';
import { receiveData } from './actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.search()
 
  }

  render() {
    // console.log(this.props.favorites)
    return (
      <div className="appWrapper">
        <Header/>
        <Nav/>
        <Switch>
          <Route path='/' component={SignIn} />
          <Route path='/register' component={RegisterUser} />
           {/* added id to users to allow for sessions  */}
          <Route path='/users' component={FirstDisplay} />
          <Route exact path='/owner' component={OwnerInterface} />
          <Route path='/allFavs' component={AllFavs} />
          {/* <Route path='/allFavs' render={props => <AllFavs {...props} favorites={this.props.favorites} />} /> */}
          <Route path='/trucks/:id' component={TruckInfo} />
          {/* <Route path='/trucks/:id' render={props => <TruckInfo {...props} />} /> */}
        </Switch>
      </div>
    )
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
      search: () => {
        fetch('https://desolate-lowlands-68945.herokuapp.com/foodtruck/all')
        .then( res => res.json() )
        .then( res => {
          // console.log(res)
          return res
        })
        .then( res => {
          dispatch(receiveData(res))
        })
      },
    }
  }

  export default withRouter(connect (state2props, dispatch2props ) (App))
