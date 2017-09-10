import React, { Component } from 'react';
import {render} from 'react-dom';

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
