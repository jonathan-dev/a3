import React from 'react';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel,
    HelpBlock
} from 'react-bootstrap';
import { Field } from 'redux-form'
import inputField from './inputField'

class ResetPage extends React.Component {
    constructor(props) {
        super(props);
        if(props.routeIsValid === undefined)
        props.check(props.match.params.id)
    }

    resetForm = () => {
        const colCentered = {
            float: 'none',
            margin: '0 auto',
        }
        const { handleSubmit, pristine, reset, submitting, invalid, loginError } = this.props
        console.log(handleSubmit)
        return (
            <Panel className="col-lg-4" style={colCentered}>
                <Form horizontal onSubmit={e =>
                    handleSubmit(e, this.props.match.params.id)}
                >
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
                            <Button type="submit" bsStyle="primary" disabled={pristine || submitting || invalid}>Send</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }

    render() {
        const { routeIsValid } = this.props;
        return (
            <section>
                {routeIsValid ?
                    this.resetForm() :
                    <h1>not valid</h1>}
            </section>
        );
    }
}

export default ResetPage;
