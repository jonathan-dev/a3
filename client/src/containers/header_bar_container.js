import { connect } from 'react-redux';
import HeaderBar from '@/header_bar';
import { push } from 'react-router-redux';
import {
    HOME_PATH,
    CREATE_POST_PATH,
    LOGIN_PATH,
    REGISTER_PATH
} from '../paths';

import { logoutUser } from '../actions/actions';

// standard links that should be displayed all the time
let standardLinks = [{
        path: HOME_PATH,
        text: 'HOME'
    },
];

let authenticatedLinks = standardLinks.concat([
    {
        path: CREATE_POST_PATH,
        text: 'Create Post'
    }
]);

// links that will only be displayed when user is not authenticated
let unauthenticatedLinks = standardLinks.concat([{
        path: LOGIN_PATH,
        text: 'Login'
    },
    {
        path: REGISTER_PATH,
        text: 'Register'
    }
]);

const getVisibleHeaderBarLinks = isAuthenticated => {
    if (isAuthenticated) return authenticatedLinks.slice(0);
    return unauthenticatedLinks.slice(0);
};

const logout = (dispatch) => {
    console.log("Im here");
    dispatch(logoutUser());
    dispatch(push(HOME_PATH));
};

const mapStateToProps = state => {
    return {
        headerBarLinks: getVisibleHeaderBarLinks(state.UserAuthentication.isAuthenticated),
        username: state.UserAuthentication.isAuthenticated ? state.UserAuthentication.username : null,
        isAuthenticated: state.UserAuthentication.isAuthenticated
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => logout(dispatch)
    }
};

const HeaderBarContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderBar);

export default HeaderBarContainer;
