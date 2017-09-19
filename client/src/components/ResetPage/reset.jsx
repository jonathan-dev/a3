import React from 'react';
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: '',
      password2: '',
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

    // TODO: change
    axios.post(window.location.origin+'/login', {
      name: this.state.email,
    })
    .then(event => console.log(event))
    .catch(error => console.log(error));
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Password:
          <input name="password1" type="password" value={this.state.password1} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name="password2" type="password" value={this.state.password2} onChange={this.handleChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default LoginPage;
