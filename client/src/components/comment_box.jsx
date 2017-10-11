import React, { Component } from 'react';
import {
    Form,
    Button,
    ButtonGroup,
    FormControl,
    Col
} from 'react-bootstrap';
import Comment from '../containers/comment_container'

const getCorrespondingActionButtons = (props, comment) => {
    let isOwnComment = comment.owner.username == props.username;
    let isInEditMode = (comment.id == props.commentInEditMode);

    if (isOwnComment && isInEditMode) {
        return (
            <ButtonGroup className="pull-right">
                <Button bsStyle="primary" bsSize="small" onClick={() => props.handleCommentUpdate(comment)}>
                    apply
                </Button>

                <Button bsStyle="danger" bsSize="small" onClick={() => props.undoEditCommentClicked(comment)}>
                    Discard
                </Button>
            </ButtonGroup>
        )
    }
    else if(isOwnComment) {
        return (
            <ButtonGroup className="pull-right">
                <Button bsStyle="primary" bsSize="small" onClick={() => props.handleCommentUpdate(comment)}>
                    Edit
                </Button>

                <Button bsStyle="danger" bsSize="small" onClick={() => props.handleDeleteComment(comment)}>
                    Delete
                </Button>
            </ButtonGroup>
        )
    }
    else {
        return null;
    }
};

const getCorrespondingCommentView = (props, comment) => {
    let isInEditMode = (comment.id == props.commentInEditMode);

    if (isInEditMode) {
        return (
            <Form horizontal onSubmit={props.handleCommentUpdate} >
                <Col sm={10}>
                    <FormControl name="comment" type="text" placeholder="comment"/>
                </Col>
                <Col sm={2}>
                    <Button type="submit" >comment</Button>
                </Col>
            </Form>
        )
    }
    else {
        <Comment comment={comment}></Comment>
    }
};

const CommentBox = props => {

    const { data } = props;
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
                const isInEditMode = (comment.id == props.commentInEditMode);
                let isOwnComment = comment.owner.username == props.username;

                let actionButtons =
                    <ButtonGroup className="pull-right">
                        <Button bsStyle="primary" bsSize="small" onClick={() => props.switchToEditMode(comment)}>
                            Edit
                        </Button>

                        <Button bsStyle="danger" bsSize="small" onClick={() => props.handleDeleteComment(comment)}>
                            Delete
                        </Button>
                    </ButtonGroup>;

                actionButtons = (isInEditMode || !isOwnComment) ? null : actionButtons;
                return (
                    <li key={index}>
                        <Comment isInEditMode={isInEditMode} editCommentText={props.editCommentText} comment={comment}></Comment>
                        {isInEditMode ? null : actionButtons}
                        <br/>
                    </li>
                )
            });
        }

        return (
            <section>
                <Form horizontal onSubmit={props.handleCommentSubmit} >
                    <Col sm={10}>
                        <FormControl name="comment" type="text" placeholder="comment"/>
                    </Col>
                    <Col sm={2}>
                        <Button type="submit" >comment</Button>
                    </Col>
                    <ul>
                        { commentList }
                    </ul>
                </Form>
            </section>
        )
    }
};

export default CommentBox;
