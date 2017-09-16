import React, { Component } from 'react';
import {render} from 'react-dom';
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(window.location.origin+'/login', {
      name: this.state.username,
      password: this.state.password
    })
    .then(event => {
      console.log(event)
      localStorage.setItem('token', event.data.token);
      event.data.token
    })
    .catch(error => console.log(error));

    // TODO: remove console statements and implement actual login
    console.log("Submitted following data: ");
    console.log("Username: " + this.state.username);
    console.log("Password: " + this.state.password);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label>

        <label>
          Password:
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        </label>

        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default LoginPage;
