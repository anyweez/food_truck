import { createStore } from 'redux'


function reducer (state, action ) {
  if(action.type === 'YELP_DATA') {

    return {
      favorites: action.payload,
      instructions: state.instructions,
      id: state.id,
    }
  }

  if (action.type === 'GO_TO_TRUCK') {
    // console.log(action.payload)
    return {
      instructions: action.payload,
      favorites: state.favorites,
      userId: state.userId,
    }
  }

if (action.type === 'Store the User Id') {
      console.log(action.payload);
    return {
  
     userId : action.payload,
     favorites: state.favorites,
     instructions: state.instructions,
    }
  }
  return state;
}

export const store = createStore(reducer, {
  favorites: [],
  instructions: [],
  userId: 0,
})
