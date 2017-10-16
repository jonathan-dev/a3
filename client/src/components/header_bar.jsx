/**
 * This component handles the visual representation of the header bar alongside displaying all links which need to be
 * included in the header bar. All necessary state information for rendering alongside functionality in form of
 * callbacks will be passed by its corresponding container and can be accessed via the props.
 * */

import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
    HOME_PATH,
    CREATE_POST_PATH,
    LOGIN_PATH,
    REGISTER_PATH,
    ADMIN_PATH
} from '../constants/paths'

const HeaderBar = props => {
    const { isAuthenticated, isAdmin, username } = props;
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    { username ? <p>Hello {username}, welcome back!</p> : null }
                </Navbar.Brand>
                <Navbar.Brand>
                    <LinkContainer to={HOME_PATH} >
                        <a>Home</a>
                    </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    { isAuthenticated ?
                        <LinkContainer to={CREATE_POST_PATH} >
                            <NavItem href={CREATE_POST_PATH}>{CREATE_POST_PATH.slice(1)}</NavItem>
                        </LinkContainer>
                        : null
                    }
                    { isAdmin ?
                        <LinkContainer to={ADMIN_PATH} >
                            <NavItem href={ADMIN_PATH}>{ADMIN_PATH.slice(1)}</NavItem>
                        </LinkContainer>
                        : null
                    }
                </Nav>
                <Nav pullRight>
                    { isAuthenticated ?
                            <NavItem key={2} onClick={props.logout}>Logout</NavItem>
                        :
                        [
                            <LinkContainer key={1} to={REGISTER_PATH} >
                                <NavItem href={REGISTER_PATH}>{REGISTER_PATH.slice(1)}</NavItem>
                            </LinkContainer>,
                            <LinkContainer key={2} to={LOGIN_PATH} >
                                <NavItem href={LOGIN_PATH}>{LOGIN_PATH.slice(1)}</NavItem>
                            </LinkContainer>
                        ]
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderBar;
