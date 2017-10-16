/**
 * Logic for editable comment
 */

import { connect } from 'react-redux';
import EditableComment from '../components/editable_comment';
import { undoEditCommentClicked, editCommentTextChanged } from '../actions/actions';
import {gql, graphql } from 'react-apollo';

/**
 * Grap needed props from redux store
 * @param {*} state
 * @param {*} ownProps
 */
const mapStateToProps = (state, ownProps) => {
    return {
        editCommentText: state.commenting.editCommentText,
        originalComment: ownProps.originalComment
    };
};

/**
 * map functions to props
 * @param {*} dispatch
 * @param {*} ownProps
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (event, originalComment) => ownProps.onSubmit(event, originalComment),
        onAbort: () => dispatch(undoEditCommentClicked()),
        onEditInputChange: event => dispatch(editCommentTextChanged(event.target.value))
    };
};

/**
 * GraphQl query to get the comment
 */
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

/**
 * GraphQl mutation to update the comment
 */
const updateComment = gql`
    mutation updateComment($comment: CommentInputType!) {
        updateComment(comment: $comment) {
            comment
        }
    }
`;

export default graphql(updateComment)(
    connect(mapStateToProps, mapDispatchToProps)(EditableComment)
);
