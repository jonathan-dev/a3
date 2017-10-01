import React from 'react'
import { Field } from 'redux-form'
import inputField from '@/inputField'
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel
} from 'react-bootstrap';

const ForgotPage = props => {
    const { handleSubmit, pristine, reset, submitting, invalid } = props

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    return (
        <Panel className="col-lg-4" style={colCentered}>
            <Form horizontal>
                <Field
                    name="email"
                    component={inputField}
                    label="Email"
                    type="text"
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


export default ForgotPage;

/**
 * TODO: reimplement submit using redux
 *     handleSubmit = (event) => {
        event.preventDefault();

        axios.post(window.location.origin + '/forgot', {
            email: this.state.email,
        })
            .then(event => console.log(event))
            .catch(error => console.log(error));
    }
 */
