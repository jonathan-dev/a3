import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import AutocompleteTagsInput from './autocomplete_tags_input'
import {
    Panel,
    ProgressBar,
    PageHeader
} from 'react-bootstrap'



class createPost extends Component {
    constructor() {
        super();

        this.state = {
            accepted: [],
            rejected: [],
            loaded: 0,
            title: '',
            imageId: '',
            tags: []
        };
    }

    handleChange = (event) => {
        console.log(event.target)
        this.setState({ title: event.target.value });
    }



    updateTags = (tags) => {
        this.setState({ tags })
    }

    getTags = () => {
        if (this.props && this.props.data && this.props.data.tags)
            return this.props.data.tags;
        return []
    }



    render() {

        const colCentered = {
            float: 'none',
            margin: '0 auto',
        }
        this.state.accepted.map(f => console.log('f: ', f))

        if (!this.props.isAuthenticated)
            return <Redirect to={'/login'} />;

        return (
            <Panel className="col-lg-4" style={colCentered}>
                <PageHeader>Post something</PageHeader>
                <input type="text" onChange={this.handleChange} />
                <div className="dropzone">
                    <Dropzone
                        accept="image/jpeg, image/png"
                        onDrop={this.props.onDropHandler}
                        disabled={this.state.accepted.length}
                    >
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        <p>Only *.jpeg this.state.accepted[0] and *.png images will be accepted</p>
                    </Dropzone>
                    { this.state.accepted[0] && <img src={this.state.accepted[0].preview}/>}
                    <ProgressBar now={this.props.progress} />
                </div>
                <AutocompleteTagsInput updateTags={this.props.updateTags} tags={this.getTags} />
                <button onClick={this.onClick}>post</button>
            </Panel>
        );
    }
}

export default (createPost)

/**
 * TODO: add styling
 * TODO: compress image before upload see trello
 */
