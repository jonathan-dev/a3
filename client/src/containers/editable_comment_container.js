import { connect } from 'react-redux';
import EditableComment from '../components/editable_comment';
import { undoEditCommentClicked, editCommentTextChanged } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    return {
        editCommentText: state.commenting.editCommentText,
        originalComment: ownProps.originalComment
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: () => console.log("Submission not implemented yet"),
        onAbort: () => dispatch(undoEditCommentClicked()),
        onEditInputChange: event => dispatch(editCommentTextChanged(event.target.value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableComment);
