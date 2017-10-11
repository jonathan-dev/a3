import React, { Component } from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';
import CreateComment from './create_comment'

import {
    Form,
    Button,
    FormControl,
    Col
} from 'react-bootstrap';
import Comment from './comment'

class CommentBox extends Component {
    constructor() {
        super();
    }

    render() {
        console.log("PROPS:");
        console.log(this.props);
        const { data } = this.props;
        if (data) {
            const { loading, error, comments } = data;
            console.log("Data on commentbox.jsx: ", data);

            console.log("Is loading", loading);
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
