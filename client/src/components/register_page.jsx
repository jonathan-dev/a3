import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH, LOGIN_PATH } from '../paths';
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
import {clearRegistrationState} from "../actions/actions";

class RegistrationPage extends Component {

    onComponentWillUnmount () {
        this.props.clearRegistrationState();
    }

    render () {
        const { pristine, submitting, invalid } = this.props;

        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        if (this.props.isAuthenticated)
            return <Redirect to={HOME_PATH} />;

        if (this.props.registrationCompleted)
            return <Redirect to={LOGIN_PATH} />;

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
