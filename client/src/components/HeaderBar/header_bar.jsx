/**
 * This file contains all links for the header bar of the react application
 * */

import React from 'react';
import { Link } from 'react-router-dom';
import * as UserAuthentication from '../../UserAuthenticaton/user_authentication';

// links that will only be displayed when user not logged in
const authenticationHeaderBarLinks = [
  <Link to="/login">login</Link>,
  <Link to="/register">register</Link>,
  <Link to="/reset/21">reset</Link>
];

const logOutLink = <Link to="/logout">logout</Link>;

// links that will always be displayed
const standardHeaderBarLinks = [
  <Link to="/">Home</Link>,
  <Link to="/create">create</Link>,
];

class HeaderBar extends React.Component {

  constructor(props) {
    super(props);

    if (UserAuthentication.userIsLoggedIn()) {
      this.state = {
        username: UserAuthentication.getUserName(),
        isAuthenticated: true
      }
    } else {
      this.state = {
        isAuthenticated: false
      }
    }
    console.log("Is authenticated: " + this.state.isAuthenticated);
  }

  render () {
    let headerBarLinks = [];
    headerBarLinks = headerBarLinks.concat(standardHeaderBarLinks);

    if (UserAuthentication.userIsLoggedIn()) headerBarLinks.push(logOutLink);
    else headerBarLinks = headerBarLinks.concat(authenticationHeaderBarLinks);

    headerBarLinks = headerBarLinks.map((link, index) => <li key={index}>{link}</li>);

    return (
      <header>
        <nav>
          { this.state.isAuthenticated  ? (
            <h1>Username: {this.state.username}</h1>
          ) : null }
          <ul>
            {headerBarLinks}
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
