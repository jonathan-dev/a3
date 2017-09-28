import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class createComment extends Component {
    constructor() {
        super();

        this.state = {
            comment: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    handleChange(event) {
        console.log(event.target)
        this.setState({ comment: event.target.value });
    }

    onClick() {
        this.props.mutate({
            variables: {
                comment: {
                    comment: this.state.comment,
                    postId: this.state.postId
                }
            }
        })
            .then(({ data }) => {
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    }

    render() {
        return (
            <section>
                <input type="comment" onChange={this.handleChange} />
                <button onClick={this.onClick}>comment</button>
            </section>
        );
    }
}

const PostMutations = gql`
mutation CommentMutations($comment: CommentInputType!) {
    createComment(comment: $comment) {
        comment
    }
}
`;

export default graphql(PostMutations)(createComment)
