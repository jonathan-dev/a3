/**
 * This file contains the visual representation for the password reset page. All necessary information will be passed
 * to this component by its wrapper components and container. Functionality is passed to this component in form
 * of callbacks by it's container and invoked whenever needed.
 * */

import React from 'react';
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel
} from 'react-bootstrap';
import { Field } from 'redux-form'
import inputField from './input_field'
import { Redirect } from 'react-router';
import { LOGIN_PATH } from '../constants/paths';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);

        // container will pass down routeIsValid given that he has verified the route
        if(!props.routeIsValid) {
            // token read out of dynamically generated url, see RESET_PASSWORD_PATH in constants/paths for further detail
            const token = props.match.params.id;

            // route has not been verified yet, dispatch the check action
            props.check(token);
        }
    }

    //  User will leave page, clear all entered details as we will need to login after resetting the password
    componentWillUnmount () {
        this.props.clearAuthentication();
    }

    render() {
        // extract all variables passed to this component by it's container
        const { routeIsValid, passwordResetCompleted } = this.props;

        // if the route has not been rendered verified yet, return not valid
        if (!routeIsValid) {
            return <h1>not valid</h1>
        }

        // if the password reset has been completed, reroute the user to the login page
        if (passwordResetCompleted) {
            return <Redirect to={LOGIN_PATH}/>;
        }

        // style object for rendering as used below
        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        // extract all necessary information handed by the container
        const { handleSubmit, pristine, submitting, invalid} = this.props;
        const token = this.props.match.params.id;

        // render the information
        return (
            <section>
                <Panel className="col-lg-4" style={colCentered}>
                    <Form horizontal onSubmit={event => handleSubmit(event, token)}>
                        <Field
                            name="password"
                            component={inputField}
                            label="Password"
                            type="password"
                        />
                        <Field
                            name="password2"
                            component={inputField}
                            label="Re-enter your password:"
                            type="password"
                        />
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit" bsStyle="primary" disabled={pristine || submitting || invalid}>
                                    Send
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
            </section>
        );
    }
}

export default ResetPage;
