/**
 * This file is the visual representation of the comment box below each post. The comment box will get rendered once
 * the user toggled the show comments button under the post. It will render the comment list and display either
 * a normal comment or an editable comment if the user has pressed the 'edit comment' button (given that it is his
 * own comment and he is logged in)
 * */

import React from 'react';
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

    // extract variables out of props
    const {data, isAuthenticated, commentInputBarValue} = props;

    // extract callbacks out of props
    const {
        handleCommentSubmit,
        handleDeleteComment,
        switchCommentToEditMode,
        handleCommentUpdate,
        onCommentInputBarChange
    } = props;


    // extract the data object passed by the graphql wrapper
    const {
        loading,
        error,
        comments
    } = data;

    // if data has not arrived yet, render loading
    if (loading) {
        return <div>Loading</div>;
    }

    // if the server responded with an error, render error
    if (error) {
        return <div>Error</div>;
    }

    // On this point comments is either an empty array or all the comments posted on that particular post
    // Wrap them up for rendering
    let commentList = comments.map((comment, index) => {
        const isOwnComment = comment.owner.username === props.username;
        const isInEditMode = comment.id === props.commentInEditMode;

        // If comment is selected to be in edit mode, show editable comment, else normal comment view
        const commentView = (isInEditMode) ?
            <EditableComment originalComment={comment} onSubmit={handleCommentUpdate}/> :
            <Comment comment={comment}/>;

        // if comment is not in edit mode and own comment -> show edit and delete buttons, the other
        // action buttons for comment in edit mode will be handled by the <EditableComment /> itself
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

    // if the user is authenticated, show commenting input field, else tell him to login to join the conversation
    const commentInputBar = (isAuthenticated) ?
        <Form horizontal onSubmit={handleCommentSubmit}>
            <Col sm={10}>
                <FormControl
                    name="comment"
                    type="text"
                    placeholder="comment"
                    onChange={onCommentInputBarChange}
                    value={commentInputBarValue}
                />
            </Col>
            <Col sm={2}>
                <Button type="submit">comment</Button>
            </Col>
        </Form> : <p>Login to join the conversation!</p>;

    // return the rendering for this component
    return (
        <section>
            {commentInputBar}
            {commentList.length ? commentList : <p>be the first to comment!</p>}
        </section>
    )
};

export default CommentBox;
