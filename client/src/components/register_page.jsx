import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from '../paths';

import {
    Form,
    FormGroup,
    ControlLabel,
    InputGroup,
    FormControl,
    Button,
    HelpBlock,
    Col,
    Panel
} from 'react-bootstrap';
import { Field } from 'redux-form'

const renderField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
    }) =>
    <FormGroup controlId="formHorizontal" validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
        {console.log(error ? error : "no error")}
        <Col componentClass={ControlLabel} sm={2}>
            <ControlLabel>{label}</ControlLabel>
        </Col>
        <Col sm={10}>
            <FormControl
                name={label}
                placeholder={label}
                {...input}
                {...custom}
            />
            <FormControl.Feedback />
            {touched && error && <HelpBlock>{error}</HelpBlock>}
        </Col>
    </FormGroup>

const renderEmailField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
    }) =>
    <FormGroup controlId="formHorizontalEmail" validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
        {console.log(error ? error : "no error")}
        <Col componentClass={ControlLabel} sm={2}>
            <ControlLabel>{label}</ControlLabel>
        </Col>
        <Col sm={10}>
            <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl
                    name="email"
                    type="email"
                    placeholder={label}
                    {...input}
                    {...custom}
                />
            </InputGroup>
            <FormControl.Feedback />
            {touched && error && <HelpBlock>{error}</HelpBlock>}
        </Col>
    </FormGroup>

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
                    component={renderField}
                    label="Username"
                />
                <Field
                    name="email"
                    component={renderEmailField}
                    label="Email"
                    type='email'
                />
                <Field
                    name="password"
                    component={renderField}
                    label="Password"
                    type='password'
                />
                <Field
                    name="password2"
                    component={renderField}
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




{/* <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text"/>
                    </label>

                    <label>
                        Email address:
                        <input name="email" type="text"/>
                    </label>

                    <label>
                        Password:
                        <input name="password" type="password"/>
                    </label>

                    <label>
                        Re-enter your password:
                        <input name="password2" type="password"/>
                    </label>
                    <button type="submit">register</button>
                </form>
            </div> */}
