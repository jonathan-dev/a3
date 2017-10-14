import {
    SHOW_POST_COMMENTS,
    HIDE_POST_COMMENTS
} from '../constants/action_types';

const initialVisibilityState = {
    visiblePostComments: new Array()
};

export function postVisibility (state = initialVisibilityState, action) {
    switch (action.type) {
        case SHOW_POST_COMMENTS:
            return Object.assign({}, state, {
                visiblePostComments: state.visiblePostComments.concat([action.post])
            });
        case HIDE_POST_COMMENTS:
            return Object.assign({}, state, {
                visiblePostComments: state.visiblePostComments.filter(post => post.id != action.post.id)
            });
        default:
            return Object.assign({}, state, initialVisibilityState);
    }
}
