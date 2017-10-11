import {
    EDIT_COMMENT_CLICKED,
    UNDO_EDIT_COMMENT_CLICKED
} from '../constants/action_types';


export function commenting (state = {}, action) {
    switch (action.type) {
        case EDIT_COMMENT_CLICKED:
            return Object.assign({}, state, { editCommentWithId: action.comment.id });
        case UNDO_EDIT_COMMENT_CLICKED:
            return Object.assign({}, state, { editCommentWithId: null });
        default:
            return state;
    }
}
