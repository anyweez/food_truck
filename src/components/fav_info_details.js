import React, { Component } from 'react';
import setVisibility from '../index';
class TruckInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelp_reviews: null,
    }
  }
    componentWillMount() {
      let url = window.location.href;
        url.includes('trucks');
          if (url.includes('trucks') === true) {
             console.log('favorite truck')
             setVisibility();
          }
    }
  

componentDidMount() {
  fetch(`https://desolate-lowlands-68945.herokuapp.com/foodtrucks/reviews?id=${this.props.match.params.id}`)
  .then( res => res.json() )
  .then( (res) =>
  this.setState({
    yelp_reviews: res,

  }, () => console.log(this.state.yelp_reviews)))
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

    return (
      <div>
        <h3>Recent reviews</h3>
        {/* <button className="goThere"
          onClick={ ()=> this.goButton()}>Back to Map
        </button> */}
        {reviews}
      </div>
    )
  }
}

export default TruckInfo;
