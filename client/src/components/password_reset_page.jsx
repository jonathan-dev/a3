import React from 'react';
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel
} from 'react-bootstrap';
import { Field } from 'redux-form'
import inputField from './inputField'
import { Redirect } from 'react-router';
import { LOGIN_PATH } from '../constants/paths';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);

        if(!props.routeIsValid) {
            // token is read from dynamically generated url
            const token = props.match.params.id;
            props.check(token);
        }
    }

    componentDidMount () {
        this.props.clearAuthentication();
    }

    componentWillUnmount () {
        this.props.clearAuthentication();
    }

    render() {
        const { routeIsValid, passwordResetCompleted } = this.props;

        if (!routeIsValid) {
            return <h1>not valid</h1>
        }

        if (passwordResetCompleted) {
            return <Redirect to={LOGIN_PATH}/>;
        }

        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        const { handleSubmit, pristine, submitting, invalid} = this.props;
        const token = this.props.match.params.id;
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
