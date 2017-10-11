import React, { Component } from 'react';

import {
    Form,
    Button,
    FormControl,
    Col
} from 'react-bootstrap';
import Comment from '../containers/comment_container'

class CommentBox extends Component {
    constructor() {
        super();
    }

    render() {
        const { data } = this.props;
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
            let commentList = comments ? comments.map((comment, index) => <Comment key={index} comment={comment} />) : null;

            return (
                <section>
                    <Form horizontal onSubmit={this.props.handleSubmit} >
                        <Col sm={10}>
                            <FormControl name="comment" type="text" placeholder="comment"/>
                        </Col>
                        <Col sm={2}>
                            <Button type="submit" >comment</Button>
                        </Col>
                    </Form>
                    { commentList }
                </section>
            )
        }
    }
}

export default CommentBox;
