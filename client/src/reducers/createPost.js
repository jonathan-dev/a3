import {
    UPDATE_UPLOAD_PROGRESS,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPDATE_TAGS
} from '../constants/action_types';

export function createPost(state = {}, action) {
    switch (action.type) {

        case UPDATE_UPLOAD_PROGRESS:
            return Object.assign({}, state, {
                uploadProgress: action.payload
            });

        case UPLOAD_IMAGE_SUCCESS:
            return Object.assign({}, state, {
                imageId: action.payload.data.imageId
            });

        case UPLOAD_IMAGE_FAIL:
            return Object.assign({}, state, {
            });

        case UPDATE_TAGS:
            return Object.assign({}, state, {
                tags: action.payload
            });

        default:
            return state
    }
}
