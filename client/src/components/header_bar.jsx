/**
 * This file contains all links for the header bar of the react application
 * */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class HeaderBar extends Component {
    render() {
        let headerBarLinks = this.props.headerBarLinks.map((link, index) =>
            <div key={index}>
                <Link to={link.path}>{link.text}</Link>
                <br/>
            </div>
        );

        return (
            <div>
                <h1>{ this.props.username }</h1>
                {headerBarLinks}
            </div>
        );
    }
}

HeaderBar.proptypes = {
    headerBarLinks: PropTypes.array
};

export default HeaderBar;
