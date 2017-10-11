import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
    Form,
    Button,
    FormControl,
    Col
} from 'react-bootstrap';

class createComment extends Component {
    constructor() {
        super();
        this.state = {
            comment: ''
        };
    }

    handleChange = (event) => {
        console.log(event.target)
        this.setState({ comment: event.target.value });
    };

    postComment = (e) => {
        e.preventDefault();
        this.props.mutate({
            variables: {
                comment: {
                    comment: this.state.comment,
                    postId: this.props.post
                }
            },
            refetchQueries: [{ query: commentListQuery, variables: { postId: this.props.post } }]
        })
            .then(({ data }) => {
                this.setState({ comment: '' });
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    }

    render() {
        return (
            <Form horizontal onSubmit={this.postComment} >
                <Col sm={10}>
                    <FormControl type="text" placeholder="comment" onChange={this.handleChange} value={this.state.comment} />
                </Col>
                <Col sm={2}>
                    <Button type="submit" >comment</Button>
                </Col>
            </Form>
        );
    }
}

const CommentMutations = gql`
mutation CommentMutations($comment: CommentInput!) {
                    createComment(comment: $comment) {
                    comment
                }
                }
`;


export const commentListQuery = gql`
    query commentListQuery($postId: String) {
        comments (postId: $postId){
            id
            comment
            owner {
                id
                username
            }
        }
    }
`;

export default graphql(CommentMutations)(createComment)
