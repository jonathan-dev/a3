import React, { Component } from 'react';
import {render} from 'react-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    // call this event when a form field changes its value
  }

  handleSubmit(event) {
    // call this when form gets send to destination
  }

  render () {
    return (
      <div>
        <!-- TODO: implement original rendering functionality -->
        <p> This text is rendered by the login Page</p>
      </div>
    );
  }
}
