/**
 * This file contains all the logic behind the comment box. The redux store state will get mapped to the needed props
 * in the mapStateToProps function. The mapDispatchTopProps function maps all functionality of the site to callbacks
 * to be invoked in the representation class.
 * */

import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';
import {
    editCommentClicked,
    undoEditCommentClicked,
    updateCommentInputBar,
    clearCommentInputBar
} from '../actions/actions';

/**
 * Handles the submission of creating a new commment
 *
 * @param {event} event event object fired by the html form
 * @param {postId} postId the post if of the belonging post
 * @param mutate
 * @param dispatch
 * @function {mutate} mutate the graphQL mutation
 * @function {dispatch} dispatch the redux dispatch function for dispatching new actions
 * */
const handleCommentSubmit = (event, postId, mutate, dispatch) => {
    event.preventDefault();
    let comment = event.target.comment.value;

    // if comment is not empty send the mutation to the server
    if (comment) {
        mutate({
            variables: {
                comment: {
                    comment: comment,
                    postId: postId
                }
            },
            // update the comment list afterwards
            refetchQueries: [{query: commentListQuery, variables: {postId: postId}}]
        })
        // clear the comment bar after sending the comment
        .then(() => dispatch(clearCommentInputBar()))
        .catch(err => console.log("Error sending comment query", err));
    }
};

/**
 * Handles the update of a existing comment
 *
 * @param event event object fired by the html form
 * @param originalComment the previous comment which shall be updated
 * @param mutate
 * @param dispatch
 * @function mutate the graphQL mutation
 * @function dispatch the redux dispatch function for dispatching new actions
 * */
const handleCommentUpdate = (event, originalComment, mutate, dispatch) => {
    event.preventDefault();
    let newComment = event.target.comment.value;

    if (newComment) {
        mutate({
            variables: {
                comment: {
                    comment: newComment,
                    commentId: originalComment.id
                }
            },
            refetchQueries: [{query: commentListQuery, variables: {postId: originalComment.postId}}]
        })
        .then(e => dispatch(undoEditCommentClicked()))
        .catch(err => console.log('error updating comment: ', err))
    }
};

/**
 * Handles the deletion of a existing comment, no need for dispatching actions as refetch query will update the state
 * on its own.
 *
 * @param {comment} comment to be deleted
 * @param {postId} postId the post if of the belonging post
 * @param mutate
 * @function {mutate} mutate the graphQL mutation
 * */
const handleDeleteComment = (comment, postId, mutate) => {
    mutate({
        variables: {
            commentId: comment.id
        },
        refetchQueries: [{query: commentListQuery, variables: {postId: postId}}]
    })
    .catch(err => console.log("Error deleting comment: ", err));
};

// Redux function for computing the props for the component
const mapStateToProps = state => {
    return {
        username: state.authentication.username,
        isAuthenticated: state.authentication.isAuthenticated,
        commentInEditMode: state.commenting.editCommentWithId,
        commentInputBarValue: state.commenting.commentInputText
    }
};

// Redux function for passing the callbacks to the component class
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // comment mutation callbacks
        handleCommentSubmit: event => handleCommentSubmit(event, ownProps.postId, ownProps.newCommentMutation, dispatch),
        handleCommentUpdate: (event, originalComment) =>
            handleCommentUpdate(event, originalComment, dispatch, ownProps.newCommentUpdateMutation),
        handleDeleteComment: comment =>
            handleDeleteComment(comment, ownProps.postId, ownProps.newCommentDeletionMutation),

        // switch and undo edit mode callbacks
        switchCommentToEditMode: comment => dispatch(editCommentClicked(comment)),
        undoEditMode: comment => dispatch(undoEditCommentClicked(comment)),

        // comment input field callbacks
        onCommentInputBarChange: event => dispatch(updateCommentInputBar(event.target.value)),
        clearCommentInputBar: () => dispatch(clearCommentInputBar())
    }
};

// comment list query to fetch all comments belonging to the post
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

// update comment mutation for updating an existing comment
const updateComment = gql`
    mutation updateComment($comment: CommentInput!) {
        updateComment(comment: $comment) {
            comment
        }
    }
`;

// create comment mutation for creating a new comment
const createComment = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            comment
        }
}`;

// delete comment mutation for deleting an existing comment
const deleteComment = gql`
    mutation deleteComment($commentId: String!) {
        deleteComment(commentId: $commentId)
    }
`;

export default graphql(createComment, { name: 'newCommentMutation' })(
    graphql(deleteComment, { name: 'newCommentDeletionMutation' })(
        graphql(updateComment, { name: 'newCommentUpdateMutation' })(
            graphql(commentListQuery)(
                connect(mapStateToProps, mapDispatchToProps)
                (CommentBox)
            )
        )
    )
)
