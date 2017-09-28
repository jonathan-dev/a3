/**
 * This file contains all links for the header bar of the react application
 * */

import React from 'react';
import { Link } from 'react-router-dom';

class HeaderBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.headerBarLinks) {
      let headerBarLinks = this.props.headerBarLinks.map((link, index) => <Link to={link.path} key={index}>{link.text}  </Link>);
      return (
        <div>
          {headerBarLinks}
        </div>
      );
    }
    return <h1>nothing to see in this header bar</h1>
  }
}

export default HeaderBar;
