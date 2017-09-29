import React, { Component } from 'react';
import axios from 'axios';
import * as UserAuthentication from '../../UserAuthenticaton/user_authentication';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;

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
      UserAuthentication.logIn(this.state.username, event.data.token);
      // TODO: implement react like reroute
      window.location.replace('/');
    })
    .catch(error => console.log(error));
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
