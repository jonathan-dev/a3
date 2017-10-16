/**
 * This file contains the visual representation of the create post page. State information needed for rendering
 * or callbacks will be passed by the create post container and can be accessed by the props.
 * */

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AutocompleteTagsInput from './autocomplete_tags_input'
import {
    Panel,
    PageHeader,
    FormGroup,
    Col,
    Button,
    Form
} from 'react-bootstrap'
import { Field } from 'redux-form'
import inputField from './input_field'
import DropzoneInput from './DropzoneInput'


class CreatePostPage extends Component {

    // Clear all state information for this page
    // this will prevent old information from already created post to be displayed
    componentDidMount() {
        // once the page did load, clear the state for cleanup
        this.props.resetState();
    }

    render() {
        // extract all needed information passed by the container wrapper
        const { handleSubmit, submitting, invalid, tags } = this.props;
        const { image, imageId, onDropHandler, onUpdateTags, progress } = this.props;

        // style object for rendering as used below
        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        // in case a user manages to get to the create post page without being logged in, reroute him to the login
        if (!this.props.isAuthenticated)
            return <Redirect to={'/login'} />;

        return (
            <Panel className="col-lg-4" style={colCentered}>
                <PageHeader>Post something</PageHeader>
                <Form horizontal onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        component={inputField}
                        label="Title"
                    />
                    <Field
                        name="image"
                        component={DropzoneInput}
                        label="Image"
                        imageId={imageId}
                        image={image}
                        progress={progress}
                        onDropHandler={onDropHandler}
                    />
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <AutocompleteTagsInput
                                onUpdateTags={onUpdateTags}
                                tags={this.props.data.tags}
                                selectedTags={tags} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button
                                type="submit"
                                bsStyle="primary"
                                disabled={submitting || invalid}
                            >
                                Send
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        );
    }
}

export default CreatePostPage;
