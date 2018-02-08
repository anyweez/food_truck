import React, { Component } from 'react';
class TruckInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelp_reviews: null,
      food_trucks: null,
    }
  }

componentDidMount() {
  fetch(`https://desolate-lowlands-68945.herokuapp.com/foodtrucks/reviews?id=${this.props.match.params.id}`)
  .then( res => res.json() )
  .then( (res) =>
  this.setState({
    yelp_reviews: res,

  }, () => console.log(this.state.yelp_reviews)))

    fetch(`https://desolate-lowlands-68945.herokuapp.com/foodtruck/all`)
    .then( res => res.json())
    .then( (res) =>
    this.setState({
      food_trucks: res,
    }, () => console.log(this.state.food_trucks)))    
}

goButton() {
  this.props.history.push('/users/:id')
 }

  render() {
    let reviews = <div></div>
    if (this.state.yelp_reviews === null) {
      return reviews
    } else {
      reviews = this.state.yelp_reviews.reviews.map((data, index) => {
        return (
          <div key={index} className="reviewBlock">
            <img className="yelpUserPic" alt="user" src={data.user.image_url} />
            <p>{data.user.name}</p>
            <p className="rating">RATING {data.rating} out of 5</p>
            <p>{data.text}</p>
            <p>{data.time_created}</p>
          </div>
        )
      })
    }

    //The below code checks if the params id matches the id in the food trucks array. If a match is found, the name is displayed on the page.
    let business_name = <h2></h2>;
    if (this.state.food_trucks === null) {
      return business_name;
    } else {
    business_name = this.state.food_trucks.map((data, index) => {
      if (data.yelpId === this.props.match.params.id) {
      return data.name;
      } else {
        return business_name;
      }
      })
    };
  
    return (
      <div>
       <h2>{business_name}</h2>
        <h4 className="today">Today's specials</h4>
        <p className="special">Chicken Parmasean Sub</p>
        <p>Two chicken breasts breaded and fried to perfection. Covered with our
          homemade sauce and fresh baked bread. Served with our delicious steak fries.</p>
        <h3>What customers are saying</h3>
        {reviews}
        
      </div>
    )
  }
}


function state2props(state){
  return {
    favorites: state.favorites,
  }
}

export default TruckInfo;
