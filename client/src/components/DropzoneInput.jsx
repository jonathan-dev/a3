import React from 'react'
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone';
import {
    FormGroup,
    HelpBlock,
    Col,
    ProgressBar
} from 'react-bootstrap';


const DropzoneInput = ({
    input,
    label,
    meta: { touched, error },
    children,
    image,
    progress,
    imageId,
    onDropHandler,
    ...custom
    }) =>
    <FormGroup>
        <Col smOffset={2} sm={10}>
            <Dropzone
                accept="image/jpeg, image/png"
                onDrop={onDropHandler}
                disabled={image != null}>
                <p>Try dropping some files here, or click to select files to upload.</p>
                <p>Only *.jpeg and *.png images will be accepted</p>
            </Dropzone>
            {image && <img src={image.preview} />}
            <ProgressBar now={progress} />
            {error && <HelpBlock>{error}</HelpBlock>}
            {console.log(imageId)}
            {imageId?
                input.onChange(imageId)
                :input.onChange(null)}
        </Col>
    </FormGroup>

export default DropzoneInput;
