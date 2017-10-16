/**
 * Handles all redux actions related to post visiblity,
 * changes state accordingly to hide/show comments & search
 * Each reducer (case) returns updated state object. Refer to redux docs for more info.
 */
import {
    SHOW_POST_COMMENTS,
    HIDE_POST_COMMENTS,
    POST_SEACHBAR_INPUT_CHANGED,
    CLEAR_POST_SEARCHBAR_INPUT
} from '../constants/action_types';


// initial postvisibility state
const initialVisibilityState = {
    visiblePostComments: [], // will contain each post which comments should be displayed (user toggled show comments)
    postSearchBarValue: "" // value for the post search bar on the top of the home page
};

export function postVisibility (state = initialVisibilityState, action) {
    switch (action.type) {

        case SHOW_POST_COMMENTS:
            return Object.assign({}, state, {
                // Adds the current post to posts that have visible comments
                visiblePostComments: state.visiblePostComments.concat([action.post])
            });

        case HIDE_POST_COMMENTS:
            return Object.assign({}, state, {
                // Removes the given post from posts that have visible comments
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
