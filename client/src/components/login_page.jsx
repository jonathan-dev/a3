import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from "../constants/paths";
import { Field } from 'redux-form'
import { LinkContainer } from 'react-router-bootstrap';
import inputField from './inputField'
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel,
    HelpBlock
} from 'react-bootstrap';

const LoginPage = props => {

    const { handleSubmit, pristine, reset, submitting, invalid, loginError } = props

    // if already logged in, reroute to home
    if (props.isAuthenticated)
        return <Redirect to={HOME_PATH} />;

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    return (
        <Panel className="col-lg-4" style={colCentered}>
            <Form horizontal onSubmit={handleSubmit}>
                <Field
                    name="username"
                    component={inputField}
                    label="username"
                />
                <Field
                    name="password"
                    component={inputField}
                    label="password"
                    type="password"
                />

                { loginError && <FormGroup validationState={'error'}>
                    <Col smOffset={2} sm={10}>
                        <HelpBlock>{loginError}</HelpBlock>
                    </Col>
                </FormGroup>}

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" bsStyle="primary" disabled={pristine || submitting || invalid}>Send</Button>
                    </Col>
                </FormGroup>
            </Form>
            <LinkContainer to='/forgot' >
                <a href={'/forgot'}>forgot your password?</a>
            </LinkContainer>
        </Panel>
    );
}

export default LoginPage;
