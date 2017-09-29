import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { commentListQuery } from '@/CommentBox/comment_box'

class createComment extends Component {
    constructor() {
        super();
        this.state = {
            comment: ''
        };
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.postComment();
        }
    }

    handleChange = (event) => {
        console.log(event.target)
        this.setState({ comment: event.target.value });
    }

    postComment = () => {
        this.props.mutate({
            variables: {
                comment: {
                    comment: this.state.comment,
                    postId: this.props.post
                }
            },
            refetchQueries: [{query:commentListQuery,variables: {postId: this.props.post}}]
        })
            .then(({ data }) => {
                this.setState({comment: ''});
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    }

    render() {
        return (
            <section>
                <input type="comment" onChange={this.handleChange} onKeyUp={this.handleKeyUp} value={this.state.comment} />
                <button onClick={this.postComment} >comment</button>
            </section>
        );
    }
}

const CommentMutations = gql`
mutation CommentMutations($comment: CommentInput!) {
    createComment(comment: $comment) {
        comment
    }
}
`

export default graphql(CommentMutations)(createComment)
