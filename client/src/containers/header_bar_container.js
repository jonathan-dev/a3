/**
 * Logic for HeaderBar
 */

import { connect } from 'react-redux';
import HeaderBar from '../components/header_bar';
import { push } from 'react-router-redux';
import {
    HOME_PATH,
    CREATE_POST_PATH,
    LOGIN_PATH,
    REGISTER_PATH
} from '../constants/paths';

import { logoutUser } from '../actions/actions';

/**
 * trigger logout of user and reroute
 * @param {*} dispatch
 */
const logout = (dispatch) => {
    dispatch(logoutUser());
    dispatch(push(HOME_PATH));
};

/**
 * Grab needed props from redux store
 * @param {*} state
 */
const mapStateToProps = state => {
    return {
        username: state.authentication.isAuthenticated ? state.authentication.username : null,
        isAuthenticated: state.authentication.isAuthenticated,
        isAdmin: state.authentication.isAdmin
    }
};

/**
 * map functions to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
    return {
        logout: () => logout(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
