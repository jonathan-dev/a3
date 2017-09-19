/**
 * This file contains all links for the header bar of the react application
 * */

import React from 'react';
import { Link } from 'react-router-dom';

class HeaderBar extends React.Component {
  render () {
    // enter all your links in the render method below
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">create</Link></li>
            <li><Link to="/hot">hot</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/register">register</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
