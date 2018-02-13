export function receiveData(response) {
  return {
    type: 'YELP_DATA',
    payload: response,
  }
}

export function storeDirections(instructions) {
  // console.log(instructions);
  return {
    type: 'GO_TO_TRUCK',
    payload: instructions,
  }
}

export function storeUserId(userId) {
  console.log(userId);
  return {
    type: 'Store the User Id',
    payload: userId,
  }
}


