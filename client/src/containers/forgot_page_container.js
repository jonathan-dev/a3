import React from 'react'
import {
    connect
} from 'react-redux';
import ForgotPage from '@/forgot_page'
import {
    checkResetRoute,
    resetPassword,
    routeValidation
} from '../actions/actions';
import {
    push
} from 'react-router-redux';

import { reduxForm } from 'redux-form'

const handleSubmit = (dispatch, event, token) => {
    event.preventDefault();
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    console.log('passwords: ', password, password2);
    if (password === password2) {
        console.log('reset password')
        dispatch(resetPassword(token, password));
    }
};

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */ ) => {
    return sleep(1000).then(() => {
        // simulate server latency
        if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
            // eslint-disable-next-line no-throw-literal
            throw {
                email: 'Email already Exists'
            }
        }
    })
}

export default reduxForm({
    form: 'ResetForm', // a unique identifier for this form
    validate,
    asyncValidate
})(ForgotPage)
