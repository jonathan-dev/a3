import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';
import { editCommentClicked, undoEditCommentClicked } from '../actions/actions';

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

const handleCommentUpdate = (event, originalComment, dispatch, mutate) => {
    event.preventDefault();
    let newComment = event.target.comment.value
    console.log("---comment wtf",event.target.comment.value);
    console.log("Original Comment was: ", originalComment);
    console.log("Updating comments not implemented yet");

    mutate({
        variables: {
            comment: {
                comment: newComment,
                commentId: originalComment.id
            }
        },
        refetchQueries: [{ query: commentListQuery, variables: { postId: originalComment.postId } }]
    })
    .then(e => dispatch(undoEditCommentClicked()))
    .catch(err => console.log('error updating comment: ',err))

    // TODO: post update comment mutation to server

    // clear form
    // dispatch(undoEditCommentClicked());
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
        username: state.authentication.username,
        isAuthenticated: state.authentication.isAuthenticated,
        commentInEditMode: state.commenting.editCommentWithId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleCommentSubmit: event => handleCommentSubmit(event, ownProps.postId, ownProps.newCommentMutation),
        switchCommentToEditMode: comment => dispatch(editCommentClicked(comment)),
        undoEditMode: comment => dispatch(undoEditCommentClicked(comment)),
        handleCommentUpdate: (event, originalComment) => handleCommentUpdate(event, originalComment, dispatch, ownProps.newCommentUpdateMutation), // TODO: REFACTOR
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
            postId
        }
    }
`;

const updateComment = gql`
    mutation updateComment($comment: CommentInput!) {
        updateComment(comment: $comment) {
            comment
        }
    }
`;

const createComment = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            comment
        }
}`;


const deleteComment = gql`
    mutation deleteComment($commentId: String!) {
        deleteComment(commentId: $commentId)
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
