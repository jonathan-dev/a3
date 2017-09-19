import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


class HeaderBar extends React.Component {
  render () {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">create</Link></li>
        <li><Link to="/hot">hot</Link></li>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/register">register</Link></li>
      </ul>
    );
  }
}

export default HeaderBar;
