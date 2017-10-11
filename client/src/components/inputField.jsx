import React from 'react'
import { Field } from 'redux-form'
import {
    FormGroup,
    ControlLabel,
    InputGroup,
    FormControl,
    HelpBlock,
    Col
} from 'react-bootstrap';


const inputField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
    }) =>
    <FormGroup controlId="formHorizontalEmail" validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
        <Col componentClass={ControlLabel} sm={2}>
            <ControlLabel>{label}</ControlLabel>
        </Col>
        <Col sm={10}>
                <FormControl
                    name="email"
                    placeholder={label}
                    {...input}
                    {...custom}
                />
            <FormControl.Feedback />
            {touched && error && <HelpBlock>{error}</HelpBlock>}
        </Col>
    </FormGroup>

export default inputField;
