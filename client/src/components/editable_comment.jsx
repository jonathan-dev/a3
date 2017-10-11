import React, {Component} from 'react';
import {
    Form,
    Button,
    ButtonGroup,
    FormControl,
    Col
} from 'react-bootstrap';

class EditableComment extends Component {

    render () {
        const {editCommentText, onSubmit, onAbort, originalComment, onEditInputChange} = this.props;

        return (
            <Form horizontal onSubmit={onSubmit}>
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
