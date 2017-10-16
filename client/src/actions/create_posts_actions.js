/**
 * This file contains all the action generators for creating posts, usage can be seen in the create post container
 * */

import {
    UPLOAD_IMAGE,
    UPDATE_TAGS,
    UPDATE_IMAGE,
    UPDATE_UPLOAD_PROGRESS,
    RESET_CREATE_POST_STATE
} from '../constants/action_types'

export function updateUploadProgress(progress) {
    return {
        type: UPDATE_UPLOAD_PROGRESS,
        payload: progress
    }
}

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

export function updateTags(tags) {
    return {
        type: UPDATE_TAGS,
        payload: tags
    }
}

export function updateImage(image) {
    return {
        type: UPDATE_IMAGE,
        payload: image
    }
}

export function resetState(){
    return {
        type: RESET_CREATE_POST_STATE
    }
}
