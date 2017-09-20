/**
 * This file contains all links for the header bar of the react application
 * */

import React from 'react';
import { Link } from 'react-router-dom';

const headerBarLinks = [
  <Link to="/">Home</Link>,
  <Link to="/create">create</Link>,
  <Link to="/hot">hot</Link>,
  <Link to="/login">login</Link>,
  <Link to="/register">register</Link>,
  <Link to="/reset/21">reset</Link>
];

class HeaderBar extends React.Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    let isAuthenticated = (token) ? true : false;
    const username = localStorage.getItem('username');

    this.state = {
      username: username,
      token: token,
      isAuthenticated: isAuthenticated
    };

    console.log("username: " + this.state.username);
  }

  render () {
    let headerBarLinkList = headerBarLinks.map((link, index) => <li key={index}>{link}</li>);

    return (
      <header>
        <nav>
          { this.state.isAuthenticated  ? (
            <h1>Username: {this.state.username}</h1>
          ) : null }
          <ul>
            {headerBarLinkList}
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
