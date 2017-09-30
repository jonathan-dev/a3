/**
 * Container for the login page. This file handles all the logic behind the
 * login page and maps the current state to the props which will get rendered
 * by the login page
 * */

import { connect } from 'react-redux';
import LoginPage from '@/login_page';
import {clearLoginFormErrors, postLogin, showLoginFormErrors} from '../actions/actions';

const loginFormIsValid = formdata => {
    return getLoginFormErrors(formdata).length == 0;
};

const getLoginFormErrors = formData => {
    let {username, password} = formData;
    let loginErrors = [];

    if (username.length == 0) loginErrors.push('Please enter a username');
    if (password.length == 0) loginErrors.push('Please enter a password');
    return loginErrors;
}

// handle submission of login information
const handleSubmit = (dispatch, event) => {
    // prevent reloading of page
    event.preventDefault();

    // extract the form data into object
    let formData = {
        username: event.target.username.value || '',
        password: event.target.password.value || ''
    };

    // if form is valid, post login data
    if (loginFormIsValid(formData))
        dispatch(postLogin(formData));
    else {
        // else show errors
        let loginErrors = getLoginFormErrors(formData);
        dispatch(showLoginFormErrors(loginErrors))
    }
};

// redux function to map the current state to props passable to the login page component for rendering
const mapStateToProps = state => {
    let loginErrors = state.UserAuthentication.loginErrors;
    return {
        isAuthenticated: state.UserAuthentication.isAuthenticated,
        loginErrors: (loginErrors) ? loginErrors.slice(0) : null
    };
};

// redux function to map dispatch functions to props to invoke callback in login page component from props
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: event => handleSubmit(dispatch, event),
        clearLoginErrors: () => dispatch(clearLoginFormErrors())
    }
};

// connect the redux functionality to the UI representation
const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPageContainer;
