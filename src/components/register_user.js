import React, { Component } from 'react';
import SignIn from './sign_in';
import { Link } from 'react-router-dom';

class RegisterUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      first_name: '',
      email: '',
      password: '',
      re_enter_password: '',
      foodType: '',
      yelpId: '',
      imageURL: '',
      url: '',
      userType: '',
    }
  }

  handleChange(state, ev) {
   
      this.setState({
        [state] : ev.target.value,
      })  
  }

checkEmail() {
  let emailCounter = 0;
  for (let i=0; i<this.state.email.length; i++) {
    if (this.state.email[i] === '@' || this.state.email[i] === '.') {
    emailCounter ++;
    }
  }
  emailCounter === 2 ? '':  alert('Please enter a valid email address');
}
  checkPassword(){
    this.checkEmail();
    let capital = ['A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let numbers = ['0','1','2','3','4','5','6','7','8','9'];
    let capitalCounter = 0;
    let numberCounter = 0;
    if(this.state.password.length < 6 || this.state.re_enter_password.length < 6) {
      alert('Passwords must be greater than 6 charcters');
    }
    for (let i = 0; i<this.state.password.length; i ++) {
      // console.log(this.state.password[i])
      for (let j = 0; j < this.state.re_enter_password.length; j++) {
        // console.log(this.state.re_enter_password[j])
        for (let k = 0; k < capital.length; k++) {
          if (this.state.password[i] === this.state.re_enter_password[j] && this.state.password[i] === capital[k]){
            // console.log(capital[k]);
          capitalCounter ++;
          }
        }
          for (let l = 0; l < numbers.length; l++) {
            if (this.state.password[i] === this.state.re_enter_password[j] && this.state.password[i] === numbers[l]){
              numberCounter ++
            }
          }
      }
    }
    if (capitalCounter === 0) {
      // console.log(counter);
      // console.log(lowerCase);
      alert('Password must contain at least one capital letter');
    }
    if (numberCounter === 0) {
      alert('Password must contain at least one number');
    } 
  }
  
   validate() {
    this.state.password === this.state.re_enter_password ? this.checkPassword() : alert('The password you entered doesn\'t match');
   }

  addUser() {
    fetch('https://desolate-lowlands-68945.herokuapp.com/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            userName: this.state.name,
            first_name: this.state.first_name,
            password: this.state.password,
            email: this.state.email,
            userType: this.state.userType,
        }),
      }),
      <SignIn/>
  }

  // addTruck() {
  //   console.log('begining of fetch request')
  // fetch('https://desolate-lowlands-68945.herokuapp.com/user/foodtruck/add', {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         userName: this.state.name,
  //         first_name: this.state.first_name,
  //         email: this.state.email,
  //         password: this.state.password,
  //         foodType: this.state.foodType,
  //         yelpId: this.state.yelpId,
  //         imageURL: this.state.imageURL,
  //         userType: this.state.userType,
  //         url: this.state.url,
  //     }),
  //   }).then(()=>console.log('end of fetch request'))
  // }

  render() {
    return (
      <div className="register">
        <img className="logoPic" alt="logo" src="../img/road_fork.png" />

        <input onChange={ ev => this.handleChange('name',ev)}
          type="text" placeholder="username" value={this.state.name}/>
        <input onChange={ ev => this.handleChange('first_name',ev)}
          type="text" placeholder="first_name" value={this.state.first_name}/>
        <input onChange={ ev => this.handleChange('email',ev)}
          type="email" placeholder="email" value={this.state.email}/>

        <input onChange={ ev => this.handleChange('password',ev)}
          type="password" placeholder="password" value={this.state.password}/>
        <input onChange={ ev => this.handleChange('re_enter_password',ev)}
          type="password" placeholder="re-enter password" value={this.state.re_enter_password}/>
        { /* added select and first name , re-enter password and options to the registration page */ }
        
        <select value={this.state.userType} onChange={ev => this.handleChange('userType', ev)}>
          <option>Choose Account</option>
          <option value='1'>Vendor</option>
          <option value='0'>Customer</option>
        </select>
      

       <Link to='/'><button onClick={() => this.validate()} className="submit" type="submit">register</button></Link>
      </div>
    )
  }
}

export default RegisterUser
