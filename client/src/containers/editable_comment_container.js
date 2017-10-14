import { connect } from 'react-redux';
import EditableComment from '../components/editable_comment';
import { undoEditCommentClicked, editCommentTextChanged } from '../actions/actions';
import {gql, graphql } from 'react-apollo';

const mapStateToProps = (state, ownProps) => {
    return {
        editCommentText: state.commenting.editCommentText,
        originalComment: ownProps.originalComment
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (event, originalComment) => ownProps.onSubmit(event, originalComment),
        onAbort: () => dispatch(undoEditCommentClicked()),
        onEditInputChange: event => dispatch(editCommentTextChanged(event.target.value))
    };
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
