import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';

const handleSubmit = (event, postId, mutate) => {
    event.preventDefault();
    let comment = event.target.comment.value;
    console.log("Comment", comment);
    let variables = {
        comment: {
            comment: comment,
                postId: postId
        }
    };

    console.log("VARS: ", variables);

    mutate({
        variables: {
            comment: {
                comment: comment.slice(0),
                postId: postId.slice(0)
            }
        },
        refetchQueries: [{ query: commentListQuery, variables: { postId: postId } }]
    })
    .then(({ data }) => {
        console.log('got data', data)
    })
    .catch(err => console.log("Error sending comment quAry", err));
};

const postComment = (e) => {
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

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("OWN POP: ", ownProps);
    return {
        handleSubmit: event => handleSubmit(event, ownProps.postId, ownProps.newCommentMutation)
    }
};

const commentListQuery = gql`
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

const createComment = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            comment
        }
}`;

const updateComment = gql`
    mutation updateComment($comment: CommentInput!) {
        updateComment(comment: $comment) {
            comment
        }
    }
`;

const CommentMutations = gql`
mutation CommentMutations($comment: CommentInput!) {
    createComment(comment: $comment) {
    comment
    }
}
`;

export default graphql(createComment, {name: 'newCommentMutation'})(
    graphql(commentListQuery)(
        connect(mapStateToProps, mapDispatchToProps)
        (CommentBox)
    )
)
