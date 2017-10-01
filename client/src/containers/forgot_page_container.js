import React from 'react'
import {
    connect
} from 'react-redux';
import ForgotPage from '@/forgot_page'
import {
    requestPasswordReset
} from '../actions/actions';
import {
    push
} from 'react-router-redux';

import { reduxForm } from 'redux-form'

const handleSubmit = (dispatch, event, token) => {
    event.preventDefault();

    console.log('---request reset')
    const email = event.target.email.value;
    dispatch(requestPasswordReset(email));
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

const mapStateToProps = state => {
    return {
        resetInfo: state.authentication.resetInfo || false,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (event) => handleSubmit(dispatch, event),
    }
};

const forgotForm = reduxForm({
    form: 'ForgotForm', // a unique identifier for this form
    validate,
    asyncValidate
})(ForgotPage)

export default connect(mapStateToProps, mapDispatchToProps)(forgotForm);
