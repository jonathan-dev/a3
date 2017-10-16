/**
 * Logic for forgot page
 */

import React from 'react'
import {
    connect
} from 'react-redux';
import ForgotPage from '../components/forgot_password_page'
import {
    requestPasswordReset,
    resetRequestPasswordRequest
} from '../actions/actions';
import {
    push
} from 'react-router-redux';

import { reduxForm } from 'redux-form'

/**
 * submit form data
 * @param {*} dispatch
 * @param {*} event
 * @param {*} token
 */
const handleSubmit = (dispatch, event, token) => {
    event.preventDefault();

    const email = event.target.email.value;
    dispatch(requestPasswordReset(email));
};

/**
 * validation function for redux form
 * @param {*} values
 */
const validate = values => {
    const errors = {}
    const requiredFields = [
        'email'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

/**
 * Grab needed props from redux store
 * @param {*} state
 */
const mapStateToProps = state => {
    return {
        resetInfo: state.authentication.resetInfo || false,
    }
};

/**
 * map methods to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (event) => handleSubmit(dispatch, event),
        resetResetInfo: () => dispatch(resetRequestPasswordRequest())
    }
};

/**
 * wrap ForgotPage with reduxForm
 */
const forgotForm = reduxForm({
    form: 'ForgotForm', // a unique identifier for this form
    validate
})(ForgotPage)

export default connect(mapStateToProps, mapDispatchToProps)(forgotForm);
