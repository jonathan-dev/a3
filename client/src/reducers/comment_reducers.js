import {
    EDIT_COMMENT_CLICKED,
    EDIT_COMMENT_TEXT_CHANGED,
    UNDO_EDIT_COMMENT_CLICKED
} from '../constants/action_types';


export function commenting (state = {}, action) {
    switch (action.type) {
        case EDIT_COMMENT_CLICKED:
            console.log("Editing comment: ", action.comment);
            return Object.assign({}, state, { editCommentWithId: action.comment.id, editCommentText: action.comment.comment });
        case EDIT_COMMENT_TEXT_CHANGED:
            return Object.assign({}, state, {editCommentText: action.newCommentText});
        case UNDO_EDIT_COMMENT_CLICKED:
            return Object.assign({}, state, { editCommentWithId: null, editCommentText: null });
        default:
            return state;
    }
}
