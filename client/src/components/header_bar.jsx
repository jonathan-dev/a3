/**
 * This file contains all links for the header bar of the react application
 * */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
    HOME_PATH,
    CREATE_POST_PATH,
    LOGIN_PATH,
    REGISTER_PATH,
    ADMIN_PATH
} from '../paths'

class HeaderBar extends Component {
    render() {
        const { isAuthenticated, isAdmin, username } = this.props;
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to={HOME_PATH} >
                            <a>Name</a>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        { isAuthenticated ?
                            <LinkContainer to={CREATE_POST_PATH} >
                                <NavItem href={CREATE_POST_PATH}>{CREATE_POST_PATH}</NavItem>
                            </LinkContainer>
                            : null
                        }
                        { isAdmin ?
                            <LinkContainer to={ADMIN_PATH} >
                                <NavItem href={ADMIN_PATH}>{ADMIN_PATH}</NavItem>
                            </LinkContainer>
                            : null
                        }
                    </Nav>
                    <Nav pullRight>
                        { isAuthenticated ?
                            [
                                <LinkContainer key={1} to={username}>
                                    <NavItem href={username}>{username}</NavItem>
                                </LinkContainer>,
                                <NavItem key={2} onClick={this.props.logout}>Logout</NavItem>
                            ]
                            :
                            [
                                <LinkContainer key={1} to={REGISTER_PATH} >
                                    <NavItem href={REGISTER_PATH}>{REGISTER_PATH}</NavItem>
                                </LinkContainer>,
                                <LinkContainer key={2} to={LOGIN_PATH} >
                                    <NavItem href={LOGIN_PATH}>{LOGIN_PATH}</NavItem>
                                </LinkContainer>
                            ]
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

HeaderBar.proptypes = {
    headerBarLinks: PropTypes.array
};

export default HeaderBar;
