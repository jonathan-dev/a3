import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import AutocompleteTagsInput from './autocomplete_tags_input'
import {
    Panel,
    ProgressBar,
    PageHeader,
    FormGroup,
    Col,
    Button,
    Form
} from 'react-bootstrap'
import { Field } from 'redux-form'
import inputField from './inputField'


class createPost extends Component {
    constructor() {
        super();

        // this.state = {
        //     accepted: [],
        //     rejected: [],
        //     loaded: 0,
        //     title: '',
        //     imageId: '',
        //     tags: []
        // };
    }

    getTags = () => {
        if (this.props && this.props.data && this.props.data.tags)
            return this.props.data.tags;
        return []
    }

    render() {

        const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
        const { image } = this.props

        const colCentered = {
            float: 'none',
            margin: '0 auto',
        }

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
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Dropzone
                                accept="image/jpeg, image/png"
                                onDrop={this.props.onDropHandler}
                                disabled={image != null}>
                                <p>Try dropping some files here, or click to select files to upload.</p>
                                <p>Only *.jpeg and *.png images will be accepted</p>
                            </Dropzone>
                            {image && <img src={image.preview} />}
                            <ProgressBar now={this.props.progress} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <AutocompleteTagsInput updateTags={this.props.updateTags} tags={this.getTags} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" bsStyle="primary" disabled={pristine || submitting || invalid}>Send</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        );
    }
}

export default (createPost)

/**
 * TODO: add styling
 * TODO: compress image before upload see trello
 */
