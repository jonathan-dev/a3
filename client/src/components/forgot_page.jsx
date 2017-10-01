import React from 'react'
import { Field, reduxForm } from 'redux-form'
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


const ForgotPage = props => {
    const { handleSubmit, pristine, reset, submitting, invalid } = props

    const panelStyle = {
        width: '90vw'    /* Occupy the 90% of the screen width */
    }

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    return (
        <Panel className="col-lg-4" style={colCentered}>
            <Form horizontal>
                <Field
                    name="email"
                    component={renderEmailField}
                    label="Email"
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
