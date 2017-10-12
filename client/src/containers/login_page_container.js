/**
 * Container for the login page. This file handles all the logic behind the
 * login page and maps the current state to the props which will get rendered
 * by the login page
 * */

import {
    connect
} from 'react-redux';
import LoginPage from '../components/login_page';
import {
    postLogin
} from '../actions/actions';
import {
    reduxForm
} from 'redux-form'

// handle submission of login information
const handleSubmit = (dispatch, event) => {
    // prevent reloading of page
    event.preventDefault();

    // extract the form data into object
    let formData = {
        username: event.target.username.value || '',
        password: event.target.password.value || ''
    };
    dispatch(postLogin(formData));
};




const validate = values => {
    const errors = {}
    const requiredFields = [
        'username',
        'password'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

// redux function to map the current state to props passable to the login page component for rendering
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        loginError: state.authentication.loginErrors
    };
};

// redux function to map dispatch functions to props to invoke callback in login page component from props
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: event => handleSubmit(dispatch, event)
    }
};

const loginForm = reduxForm({
    form: 'ResetForm', // a unique identifier for this form
    validate,
})(LoginPage);

// connect the redux functionality to the UI representation
const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(loginForm);

export default LoginPageContainer;
