import React, { Component }from 'react'
import { Field } from 'redux-form'
import inputField from './input_field'
import { LinkContainer } from 'react-router-bootstrap';
import {
    Form,
    FormGroup,
    Button,
    Col,
    Panel
} from 'react-bootstrap';

class ForgotPage extends Component {

    componentWillUnmount() {
        this.props.resetResetInfo()
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, invalid, resetInfo } = this.props

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    return (
        <Panel className="col-lg-4" style={colCentered}>
            <Form horizontal onSubmit={handleSubmit}>
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
            {resetInfo && resetInfo === 'success' &&
                <div>
                    <LinkContainer to='/' >
                        <a href={'/'}>Retun to Home</a>
                    </LinkContainer>
                    <p>request was send successfully! check your emails</p>
                </div>
            }
        </Panel>
    );
    }
}

export default ForgotPage;
