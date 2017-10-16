/**
 * Handles all redux actions related to editing comments,
 * modifies the state to add or remove the comment that's currently being edited & it's details
 * Each reducer (case) returns updated state object. Refer to redux docs for more info.
 */
import {
    EDIT_COMMENT_CLICKED,
    EDIT_COMMENT_TEXT_CHANGED,
    UNDO_EDIT_COMMENT_CLICKED,
    CLEAR_COMMENT_INPUT_BAR,
    COMMENT_INPUT_FIELD_CHANGED,
} from '../constants/action_types';

const initalState = {
    editCommentWithId: null,
    editCommentText: "",
    commentInputText: "",
};

export function commenting (state = initalState, action) {
    switch (action.type) {
        case EDIT_COMMENT_CLICKED:
            return Object.assign({}, state, { editCommentWithId: action.comment.id, editCommentText: action.comment.comment });
        case EDIT_COMMENT_TEXT_CHANGED:
            return Object.assign({}, state, {editCommentText: action.newCommentText});
        case UNDO_EDIT_COMMENT_CLICKED:
            return Object.assign({}, state, { editCommentWithId: null, editCommentText: "" });
        case COMMENT_INPUT_FIELD_CHANGED:
            return Object.assign({}, state, { commentInputText: action.newInput });
        case CLEAR_COMMENT_INPUT_BAR:
            return Object.assign({}, state, { commentInputText: "" });
        default:
            return state;
    }
}
