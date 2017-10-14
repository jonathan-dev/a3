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
import inputField from './inputField'
import DropzoneInput from './DropzoneInput'


class CreatePostPage extends Component {

    componentDidMount() {
        this.props.resetState();
    }

    render() {

        const { handleSubmit, submitting, invalid } = this.props;
        const { image, imageId, onDropHandler, onUpdateTags, progress, getTags } = this.props;

        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

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
                        imageId = {imageId}
                        image = {image}
                        progress = {progress}
                        onDropHandler = {onDropHandler}
                    />
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <AutocompleteTagsInput onUpdateTags={onUpdateTags} tags={getTags}/>
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
