import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class LogoutPage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Redirect to='/'/>
    );
  }
}

export default LogoutPage;
