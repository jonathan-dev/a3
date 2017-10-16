/**
 * Declares action generators specifically for making a post.
 * Usage can be seen in the create post container
 * See actions.js for more info.
 */
import {
    UPLOAD_IMAGE,
    UPDATE_TAGS,
    UPDATE_IMAGE,
    UPDATE_UPLOAD_PROGRESS,
    RESET_CREATE_POST_STATE
} from '../constants/action_types'

/**
 * Generates action for updating the image upload progres
 * @param {Number} progress - Progress amount (between 1 and 100)
 */
export function updateUploadProgress(progress) {
    return {
        type: UPDATE_UPLOAD_PROGRESS,
        payload: progress
    }
}

/**
 * Uploads a given image
 * @param {ReduxDispatch} dispatch - Redux dispatch object to dispatch action to
 * @param {FormData} FormData - Object, has image and form data
 */
export function uploadImage(dispatch, FormData) {
    return {
        type: UPLOAD_IMAGE,
        // reminder, all actions with a payload key will get handled by the axios middleware
        payload: {
            request: {
                url: '/upload',
                method: 'POST',
                data: FormData,
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        let loaded = Math.round((e.loaded / e.total) * 100);
                        dispatch(updateUploadProgress(loaded));
                    }
                }
            }
        }
    }
}

/**
 * Action generator for modifying the new post's tags
 * @param {Tags} tags - Json obj, contains tag name
 */
export function updateTags(tags) {
    return {
        type: UPDATE_TAGS,
        payload: tags
    }
}

/**
 * Action generator for updating an image
 * @param {Image} image - Image data stored in json obj
 */
export function updateImage(image) {
    return {
        type: UPDATE_IMAGE,
        payload: image
    }
}

/**
 * Resets the create post state
 */
export function resetState(){
    return {
        type: RESET_CREATE_POST_STATE
    }
}
