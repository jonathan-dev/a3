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

    onClick = () => {
        this.props.mutate({
            variables: { post: { title: this.state.title, imageId: this.state.imageId, tags: this.state.tags } }
        })
            .then(({ data }) => {
                console.log('got data', data);
                this.props.history.push('/')
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    }

    updateTags = (tags) => {
        this.setState({ tags })
    }

    getTags = () => {
        if (this.props && this.props.data && this.props.data.tags)
            return this.props.data.tags;
        return []
    }

    onDropHandler = (accepted, rejected) => {
        this.setState({ accepted, rejected });
        if (accepted) {

            let formData = new FormData();
            formData.append("index", 1);
            formData.append("image", accepted[0]);

            axios.post(window.location.origin + '/upload', formData, {
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        let loaded = Math.round((e.loaded / e.total) * 100);
                        this.setState({ loaded: loaded })
                    }
                }
            })
                .then(response => {
                    let data = response.data;
                    console.log(response);
                    this.setState({ imageId: data.imageId })
                })
                .catch(err => {

                    console.log(err);
                });
        }
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
                        onDrop={this.onDropHandler}
                        disabled={this.state.accepted.length}
                    >
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        <p>Only *.jpegthis.state.accepted[0] and *.png images will be accepted</p>
                    </Dropzone>
                    { this.state.accepted[0] && <img src={this.state.accepted[0].preview}/>}
                    <ProgressBar now={this.state.loaded} />
                </div>
                <AutocompleteTagsInput updateTags={this.updateTags} tags={this.getTags} />
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
