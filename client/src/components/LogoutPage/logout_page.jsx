import React from 'react';
import { Redirect } from 'react-router-dom'
import * as UserAuthentication from '../../UserAuthenticaton/user_authentication';

class LogoutPage extends React.Component {
  constructor (props) {
    super(props);
    UserAuthentication.logOut();
  }

  render () {
    return (
      <Redirect to='/'/>
    );
  }
}

export default LogoutPage;
