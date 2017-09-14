import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class RegisterPage extends React.Component {

  //Prepare class
  constructor (props) {
    super(props);

    //Set up state variable with all necessary fields
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
    };

    //Bind events to class methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Handles changes in the input fields on the page
  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

    //TODO: Check username not already in use
    //TODO: Check passwords match, display error message if not
    //TODO: Check password complexity
  }

  //Handles submission of register form
  handleSubmit (event) {
    event.preventDefault(); //Stops page refresh

    if(this.state.password.localeCompare(this.state.password2)===0){
      axios.post(window.location.origin+'/register', {
        name: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(e => console.log(e))
      .catch(err => console.log(err))
    } else {
      console.log('passwords dont match')
      // TODO: give visual feedback
    }

    //TODO: remove log statements
    console.log("Submitted registration request", )
  }

  //Render HTML register form
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label>

        <label>
          Email address:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>

        <label>
          Password:
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        </label>

        <label>
          Re-enter your password:
          <input name="password2" type="password" value={this.state.password2} onChange={this.handleChange} />
        </label>
        <button type="submit">register</button>
      </form>
    );
  }
}

export default RegisterPage;
