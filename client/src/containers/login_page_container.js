/**
 * Container for the login page. This file handles all the logic behind the
 * login page and maps the current state to the props which will get rendered
 * by the login page
 * */

import { connect } from 'react-redux';
import LoginPage from '@/login_page'
import { push } from 'react-router-redux';
import { HOME_PATH } from '../paths';
import {
    createLoginFormInputChangedAction,
    postLoginInformation,
    createLoginUserAction
} from '../actions/actions';

// Handle input change in login form
const handleInputChange = (dispatch, event) => {
    // name of form field which changed value
    let name = event.target.name;

    // changed value
    let value = event.target.value;
    let changedInput = {
        [name]: value
    };

    dispatch(createLoginFormInputChangedAction(changedInput));
};

// handle submission of login information
const handleSubmit = (dispatch, event) => {
    // prevent reloading of page
    event.preventDefault();

    // extract the form data into object
    let formData = {
        username: event.target.username.value,
        password: event.target.password.value
    };

    // dispatch postLoginInformation with the extracted form data
    dispatch(postLoginInformation(formData))
        .then(event => {
            // login succeeded TODO: implement on success functionality after login

            // reroute to home page
            dispatch(push(HOME_PATH));
        })
        .catch(error => {
            // TODO: give visual feedback to user
            console.log("failed to login");
        });
};

// redux function to map the current state to props passable to the login page component for rendering
const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password,
        isAuthenticated: state.isAuthenticated
    };
};

// redux function to map dispatch functions to props to invoke callback in login page component from props
const mapDispatchToProps = dispatch => {
    return {
        onInputChanged: event => handleInputChange(dispatch, event),
        handleSubmit: event => handleSubmit(dispatch, event),
        rerouteToHome: () => dispatch(createLoginUserAction(null))
    }
};

// connect the redux functionality to the UI representation
const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPageContainer;
