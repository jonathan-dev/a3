import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from '../paths';
import inputField from './inputField'
import {
    Form,
    FormControl,
    FormGroup,
    Button,
    Col,
    Panel
} from 'react-bootstrap';
import { Field } from 'redux-form'

const RegisterPage = props => {

    const { handleSubmit, pristine, reset, submitting, invalid } = props

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }
    // if logged in redirect to home TODO: check if works properly with saving stuff to local storage
    if (props.isAuthenticated)
        return <Redirect to={HOME_PATH} />;

    return (
        <Panel className="col-lg-4" style={colCentered}>
            <Form horizontal onSubmit={props.handleSubmit}>
                <Field
                    name="username"
                    component={inputField}
                    label="Username"
                />
                <Field
                    name="email"
                    component={inputField}
                    label="Email"
                    type='email'
                />
                <Field
                    name="password"
                    component={inputField}
                    label="Password"
                    type='password'
                />
                <Field
                    name="password2"
                    component={inputField}
                    label="Retype Password"
                    type='password'
                />
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" bsStyle="primary" disabled={pristine || submitting || invalid}>Send</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Panel>
    );
}

export default RegisterPage;
