/**
 * Container for the login page. This file handles all the logic behind the
 * login page and maps the current state to the props which will get rendered
 * by the login page
 * */

import { connect } from 'react-redux';
import LogoutPage from '@/logout_page'
import { push } from 'react-router-redux';
import { HOME_PATH } from '../paths';

import { logoutUser } from '../actions/actions';

const logout = (dispatch) => {
    dispatch(logoutUser());
    dispatch(push(HOME_PATH));
};

// redux function to map the current state to props passable to the login page component for rendering
const mapStateToProps = state => {
    return {
        // add logout props here
    };
};

// redux function to map dispatch functions to props to invoke callback in login page component from props
const mapDispatchToProps = dispatch => {
    return {
        logout: () => { logout(dispatch) }
    }
};

// connect the redux functionality to the UI representation
const LogoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(LogoutPage);

export default LogoutPageContainer;
