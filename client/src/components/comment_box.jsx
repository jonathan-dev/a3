import React, { Component } from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';
import CreateComment from './create_comment'
import Comment from './comment'

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
                return <div>Error</div>
            }

            return (
                <section>
                    <CreateComment post={this.props.post} />
                    {comments.map(comment => <Comment comment={comment} />)}
                </section>
            )
        }
    }
}

export const commentListQuery = gql`
    query commentListQuery($postId: String) {
        comments (postId: $postId){
            id
            comment
            owner {
                id
                username
            }
            voteup
            votedown
        }
    }
`;

export default graphql(commentListQuery, {
    options: (props) => ({
        variables: {
            postId: props.post
        }
    })
})(CommentBox);
