import React, {Component} from 'react';

class EditableComment extends Component {

    render () {
        const {editCommentText, onSubmit, onAbort, comment} = props;

        return (
            <Form horizontal onSubmit={onSubmit}>
                <h2 className="author">{comment.owner.username}</h2>
                <Col sm={10}>
                    <FormControl name="comment" type="text" placeholder="comment" value={editCommentText}/>
                </Col>
                <Col sm={2}>
                    <ButtonGroup className="pull-right">
                        <Button type="submit" bsStyle="primary" bsSize="small">Apply</Button>
                        <Button bsStyle="danger" bsSize="small" onClick={onAbort}>Abort</Button>
                    </ButtonGroup>;
                    <Button type="submit" >apply</Button>
                </Col>
            </Form>
        );
    }
}

export default EditableComment;
