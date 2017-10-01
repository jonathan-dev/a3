import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from "../paths";
import { Field } from 'redux-form'
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
                type={label}
                placeholder={label}
                {...input}
                {...custom}
            />
            <FormControl.Feedback />
            {touched && error && <HelpBlock>{error}</HelpBlock>}
        </Col>
    </FormGroup>

const LoginPage = props => {

    const { handleSubmit, pristine, reset, submitting, invalid } = props


    // if already logged in, reroute to home
    if (props.isAuthenticated)
        return <Redirect to={HOME_PATH} />;

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    return (
        <Panel className="col-lg-4" style={colCentered}>
            <Form horizontal onSubmit={props.handleSubmit}>
                <Field
                    name="username"
                    component={renderField}
                    label="username"
                />
                <Field
                    name="password"
                    component={renderField}
                    label="password"
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

export default LoginPage;
