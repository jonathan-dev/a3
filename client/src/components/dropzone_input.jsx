/**
 * Wraps the react Dropzone to be used as form input with redux form
 *
 * react-dropzone: https://www.npmjs.com/package/react-dropzone
 */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {
    FormGroup,
    HelpBlock,
    Col,
    ProgressBar
} from 'react-bootstrap';


class DropzoneInput extends Component {

    /**
     * trigger redux form change when an image Id is received
     */
    componentDidUpdate() {
        const { imageId, input } = this.props;
        if (imageId) {
            input.onChange(imageId)
        } else {
            input.onChange(null)
        }
    }

    render() {

        const {
            input,
            label,
            meta: { touched, error },
            children,
            image,
            progress,
            imageId,
            onDropHandler,
            ...custom
            } = this.props;

        return (
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Dropzone
                        accept="image/jpeg, image/png"
                        onDrop={onDropHandler}
                        disabled={image != null}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        <p>Only *.jpeg and *.png images will be accepted</p>
                    </Dropzone>
                    {image && <img src={image.preview} style={{"width" : "100%"}}/>}
                    <ProgressBar now={progress} />
                    {error && <HelpBlock>{error}</HelpBlock>}
                </Col>
            </FormGroup>
        );
    }
}

export default DropzoneInput;
