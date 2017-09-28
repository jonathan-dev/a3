import React from 'react';
import { Link } from 'react-router-dom';


class HeaderBarLink extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <Link onClick={this.props.onClick} to={this.props.path}>{this.props.text}</Link>
    );
  }
}

export default HeaderBarLink;
