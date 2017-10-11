import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';

const handleCommentSubmit = (event, postId, mutate) => {
    event.preventDefault();
    let comment = event.target.comment.value;

    mutate({
        variables: {
            comment: {
                comment: comment,
                postId: postId
            }
        },
        refetchQueries: [{ query: commentListQuery, variables: { postId: postId } }]
    })
    .then(({ data }) => {
        console.log('got data', data)
    })
    .catch(err => console.log("Error sending comment quAry", err));
};

const handleEditComment = (comment, postId, mutate) => {
    console.log("Edit comment was clicked", comment);

};

const handleDeleteComment = (comment, postId, mutate) => {
    mutate({
        variables: {
            commentId: comment.id
        },
        refetchQueries: [{ query: commentListQuery, variables: { postId: postId } }]
    })
    .then(({data}) => {
        console.log("Deleted comment", data);
    })
    .catch(err => console.log("Error deleting comment: ", err));
};

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.authentication.username
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleCommentSubmit: event => handleCommentSubmit(event, ownProps.postId, ownProps.newCommentMutation),
        handleEditComment: comment => handleEditComment(commentId, newCommentText, ownProps.postId, ownProps.newCommentUpdateMutation),
        handleDeleteComment: comment => handleDeleteComment(comment, ownProps.postId, ownProps.newCommentDeletionMutation)
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
            date
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
    mutation updateComment($comment: Comment!) {
        updateComment(comment: $comment) {
            comment
        }
    }
`;

const deleteComment = gql`
    mutation deleteComment($commentId: String!) {
        deleteComment(commentId: $commentId)
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
    graphql(deleteComment, {name: 'newCommentDeletionMutation'})(
        graphql(updateComment, {name: 'newCommentUpdateMutation'})(
            graphql(commentListQuery)(
                connect(mapStateToProps, mapDispatchToProps)
                (CommentBox)
            )
        )
    )
)
