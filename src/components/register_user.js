import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class RegisterUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customer: '',
      name: '',
      first_name: '',
      email: '',
      password: '',
      re_enter_password: '',
      foodType: '',
      yelpId: '',
      imageURL: '',
      url: '',
      vendor: '',
    }
  }

  handleChange(state, ev) {
   
      this.setState({
        [state] : ev.target.value
      })   
  }
checkEmail() {
  let emailCounter = 0;
  for (let i=0; i<this.state.email.length; i++) {
    console.log(this.state.email[i]);
    if (this.state.email[i] === '@' || this.state.email[i] === '.') {
    emailCounter ++;
    
    }
  }
  console.log(emailCounter);
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
      alert('Password must contain one capital letter');
    }
    if (numberCounter === 0) {
      alert('Password must contain one number');
    }
    
  }

   validate() {

    this.state.password === this.state.re_enter_password ? this.checkPassword() : alert('The password you entered doesn\'t match');
    
          if (this.state.vendor !== '') {
            this.addTruck()
          }
          if (this.state.customer !== '') {
            this.addUser()
          }
   }

  addUser() {
    fetch('https://desolate-lowlands-68945.herokuapp.com/login', {
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
        }),
      })
  }

  addTruck() {
    console.log('begining of fetch request')
  fetch('https://desolate-lowlands-68945.herokuapp.com/user/foodtruck/add', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: this.state.name,
          first_name: this.state.first_name,
          email: this.state.email,
          password: this.state.password,
          foodType: this.state.foodType,
          yelpId: this.state.yelpId,
          imageURL: this.state.imageURL,
          url: this.state.url,
      }),
    }).then(()=>console.log('end of fetch request'))
  }

  render() {
    return (
      <div className="register">
        {/* <input onChange={ ev => this.handleChange('name',ev)}
          type="text" placeholder="user name"/> */}

        {/* <input onChange={ ev => this.handleChange('name',ev)}
          type="password" placeholder="password"/> */}
        <img className="logoPic" src="../img/road_fork.png" />

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
        <select>
          < option label='Choose Account'>Choose Account</option>
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
        </select>

        <button onClick={() => this.validate()} className="submit" type="submit">register</button>
      </div>
    )
  }
}

export default RegisterUser
