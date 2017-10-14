import {
    SHOW_POST_COMMENTS,
    HIDE_POST_COMMENTS,
    POST_SEACHBAR_INPUT_CHANGED,
    CLEAR_POST_SEARCHBAR_INPUT
} from '../constants/action_types';

const initialVisibilityState = {
    visiblePostComments: [],
    postSearchBarValue: ""
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
        case POST_SEACHBAR_INPUT_CHANGED:
            return Object.assign({}, state, {postSearchBarValue: action.newInput});
        case CLEAR_POST_SEARCHBAR_INPUT:
            return Object.assign({}, state, {postSearchBarValue: ""});

        default:
            return state
    }
}
