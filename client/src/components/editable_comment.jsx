/**
 * This file is the visual representation of an editable comment. An editable comment is a comment which the user chose
 * to edit, thus it needs to be his own comment and he needs to be logged in. Only one comment can be edited at a time.
 *
 * All state information needed for rendering, as well as functionality in form of callbacks will be based by the
 * editable comment container.
 * */

import React, { Component } from 'react';
import {
    Form,
    Button,
    ButtonGroup,
    FormControl,
    Col
} from 'react-bootstrap';

class EditableComment extends Component {

    render () {
        // extract all variables passed by the corresponding container
        const {editCommentText, onSubmit, onAbort, originalComment, onEditInputChange} = this.props;

        // return the visual representation including an input field for editing the comment
        return (
            <Form horizontal onSubmit={(event) => onSubmit(event, originalComment)}>
                <h2 className="author">{originalComment.owner.username}</h2>
                <Col sm={10}>
                    <FormControl name="comment" type="text" placeholder="comment" value={editCommentText} onChange={onEditInputChange}/>
                </Col>
                <ButtonGroup className="pull-right">
                    <Button type="submit" bsStyle="primary" bsSize="small">Apply</Button>
                    <Button bsStyle="danger" bsSize="small" onClick={onAbort}>Abort</Button>
                </ButtonGroup>
            </Form>
        );
    }
}

export default EditableComment;
