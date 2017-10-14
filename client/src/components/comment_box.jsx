import React, { Component } from 'react';
import {
    Form,
    Button,
    ButtonGroup,
    FormControl,
    Col
} from 'react-bootstrap';
import Comment from '../containers/comment_container'
import EditableComment from '../containers/editable_comment_container';

const CommentBox = props => {

    const { data, isAuthenticated, handleCommentSubmit, handleDeleteComment, switchCommentToEditMode, handleCommentUpdate} = props;
    if (data) {
        const { loading, error, comments } = data;

        if (loading) {
            return <div>Loading</div>
        }
        if (error) {
            console.log(error);
            return <div>Error</div>
        }

        let commentList = null;
        if (comments) {
            commentList = comments.map((comment, index) => {
                const isOwnComment = comment.owner.username == props.username;
                const isInEditMode = comment.id == props.commentInEditMode;

                const commentView = (isInEditMode) ?
                    <EditableComment originalComment={comment} onSubmit={handleCommentUpdate}/> : <Comment comment={comment}/>;

                const actionButtons = (isOwnComment && !isInEditMode) ?
                    <ButtonGroup className="pull-right">
                        <Button bsStyle="primary" bsSize="small" onClick={() => switchCommentToEditMode(comment)}>
                            Edit
                        </Button>

                        <Button bsStyle="danger" bsSize="small" onClick={() => handleDeleteComment(comment)}>
                            Delete
                        </Button>
                    </ButtonGroup> : null;

                    return (
                        <div key={index}>
                            {commentView}
                            {actionButtons}
                        </div>
                    );
            });
        }

        return (
            <section>
                { isAuthenticated ?
                    <Form horizontal onSubmit={handleCommentSubmit} >
                        <Col sm={10}>
                            <FormControl name="comment" type="text" placeholder="comment" onChange={props.onCommentInputBarChange} value={props.commentInputBarValue}/>
                        </Col>
                        <Col sm={2}>
                            <Button type="submit" >comment</Button>
                        </Col>
                    </Form> :
                    <p>Login to join the conversation!</p>
                }
                { commentList }
            </section>
        )
    }
};

export default CommentBox;
