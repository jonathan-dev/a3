/**
 * This component contains the visual representation of the Registration page. All state information needed as well
 * as the functionality behind functions will be passed to this component as either variables or callbacks to be invoked
 * whenever needed by it's wrapping component and container class.
 * */

import React, { Component } from 'react';
import inputField from './input_field'
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel
} from 'react-bootstrap';
import { Field } from 'redux-form';
import { Redirect } from 'react-router';
import { LOGIN_PATH } from "../constants/paths";

class RegistrationPage extends Component {

    // once the user leaves this page clear the authentification state as he needs to login after registration
    componentWillUnmount () {
        this.props.clearAuthenticationState();
    }

    render () {
        // extract the data handed to this component
        const { pristine, submitting, invalid, registrationCompleted, handleSubmit } = this.props;

        // once registration has been completed, reroute the user to the login page
        if (registrationCompleted) {
            return <Redirect to={LOGIN_PATH}/>;
        }

        // style object used for rendering as seen below
        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        // return the visual representation adjusted with the given props variables / callbacks
        return (
            <Panel className="col-lg-4" style={colCentered}>
                <Form horizontal onSubmit={handleSubmit}>
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
}

export default RegistrationPage;
