import React, { Component } from 'react';
import axios from 'axios';

import { Form, FormGroup, ControlLabel, InputGroup, FormControl, Button } from 'react-bootstrap';

class ForgotPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailValid: null,
            formValid: false
        };
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;

        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            emailValid = emailValid ? 'success' : 'error';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                      }, this.validateForm);
      }

    validateForm() {
        this.setState({formValid: this.state.emailValid === 'success'});
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(
            {
                [name]: value},
                () => { this.validateField(name, value)
            }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post(window.location.origin + '/forgot', {
            email: this.state.email,
        })
            .then(event => console.log(event))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="formInlineName" validationState={this.state.emailValid}>
                    <ControlLabel>Email:</ControlLabel>
                    {' '}
                    <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl name="email" type="email" value={this.state.email} onChange={this.handleChange} />
                    </InputGroup>
                    <FormControl.Feedback />
                </FormGroup>
                    {' '}
                <Button type="submit" bsStyle="primary" disabled={this.state.formValid?false:true}>Send</Button>
            </Form>

        );
    }
}

export default ForgotPage;
