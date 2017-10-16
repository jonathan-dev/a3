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

    componentWillUnmount () {
        this.props.clearAuthenticationState();
    }

    render () {
        const { pristine, submitting, invalid, registrationCompleted } = this.props;

        if (registrationCompleted) {
            return <Redirect to={LOGIN_PATH}/>;
        }

        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        return (
            <Panel className="col-lg-4" style={colCentered}>
                <Form horizontal onSubmit={this.props.handleSubmit}>
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
