/**
 * Handles all redux actions related to uploading images & creating posts,
 * modifies the state with new post info accordingly.
 * Each reducer (case) returns updated state object. Refer to redux docs for more info.
 */
import {
    UPDATE_UPLOAD_PROGRESS,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPDATE_TAGS,
    UPDATE_IMAGE,
    RESET_CREATE_POST_STATE
} from '../constants/action_types';

// initial state for the create post state
const initialState = {
    uploadProgress: 0, // upload progress value for the progress bar
    imageId: null,
    image: null,
    tags: null
};

export function createPost(state = initialState, action) {
    switch (action.type) {

        case UPDATE_UPLOAD_PROGRESS:
            return Object.assign({}, state, { uploadProgress: action.payload });

        case UPLOAD_IMAGE_SUCCESS:
            return Object.assign({}, state, { imageId: action.payload.data.imageId });

        case UPDATE_TAGS:
            return Object.assign({}, state, { tags: action.payload });

        case UPDATE_IMAGE:
            return Object.assign({}, state, { image: action.payload });

        case RESET_CREATE_POST_STATE:
            return Object.assign({}, state, initialState);

        default:
            return state
    }
}
