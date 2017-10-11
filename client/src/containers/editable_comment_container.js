import { connect } from 'react-redux';
import EditableComment from '../components/editable_comment';
import { undoEditCommentClicked } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    return {
        editCommentText: state.commenting.editCommentText,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: () => console.log("Submission not implemented yet");
        onAbort: dispatch(undoEditCommentClicked())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableComment);
