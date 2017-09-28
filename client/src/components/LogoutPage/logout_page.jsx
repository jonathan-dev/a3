import React from 'react';
import { Redirect } from 'react-router-dom'
import * as UserAuthentication from '../../UserAuthenticaton/user_authentication';
import {createLogoutUserAction} from "../../actions/actions";

class LogoutPage extends React.Component {
  constructor (props) {
    super(props);
    store.dispatch(createLogoutUserAction())
  }

  render () {
    return (
      <Redirect to='/'/>
    );
  }
}

export default LogoutPage;
