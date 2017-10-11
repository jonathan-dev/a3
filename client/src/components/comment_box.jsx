import React, { Component } from 'react';

import {
    Form,
    Button,
    ButtonGroup,
    FormControl,
    Col
} from 'react-bootstrap';
import Comment from '../containers/comment_container'



const CommentBox = props => {
    const deleteButton = <Button bsStyle="danger" bsSize="small" onClick={props.handleDeleteComment}>Delete</Button>;
    const editButton = <Button bsStyle="primary" bsSize="small" onClick={props.handleEditComment}>Edit</Button>;

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

        // if there are comments, wrap them for representation
        let commentList = comments ?
            comments.map((comment, index) => {
                let isOwnComment = comment.owner.username == props.username;
                let actionButtons = isOwnComment ?
                    <ButtonGroup className="pull-right">
                        {editButton}
                        {deleteButton}
                    </ButtonGroup> : null;

                    return (
                        <div key={index}>
                            <Comment styte={{marginBottom: "25px", display: "inline"}} comment={comment}></Comment>
                            {actionButtons}
                            <br/>
                        </div>
                    );
            }) : null;

        return (
            <section>
                <Form style={{marginBottom: "25px"}}horizontal onSubmit={props.handleCommentSubmit} >
                    <Col sm={10}>
                        <FormControl name="comment" type="text" placeholder="comment"/>
                    </Col>
                    <Col sm={2}>
                        <Button type="submit" >comment</Button>
                    </Col>
                </Form>
                <ol>
                    { commentList }
                </ol>
            </section>
        )
    }
};

export default CommentBox;
