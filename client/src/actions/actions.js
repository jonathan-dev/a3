/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
    LOGOUT_USER,
    POST_LOGIN,
    CHECK_RESET_ROUTE,
    RESET_PASSWORD,
    POST_REGISTRATION,
    REQUEST_RESET_PASSWORD,
    UPDATE_UPLOAD_PROGRESS,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPDATE_TAGS

} from '../constants/action_types';

// action generator for posting login information
export function postLogin(loginData) {
    return {
        type: POST_LOGIN,
        payload: {
            request: {
                url: '/login',
                method: 'POST',
                data: Object.assign({}, loginData),
            }
        }
    }
}

// action generator for posting login information
export function postRegistration(registrationData) {
    return {
        type: POST_REGISTRATION,
        payload: {
            request: {
                url: '/register',
                method: 'POST',
                data: Object.assign({}, registrationData)
            }
        }
    }
}

export function requestPasswordReset(email) {
    return {
        type: REQUEST_RESET_PASSWORD,
        payload: {
            request: {
                method: 'POST',
                url: '/forgot',
                data: {
                    email: email
                }
            }
        }
    }
}

export function checkResetRoute(token) {
    return {
        type: CHECK_RESET_ROUTE,
        payload: {
            request: {
                method: 'POST',
                url: '/reset',
                data: {
                    token: token
                }
            }
        }
    }
}

export function resetPassword(token, password) {
    return {
        type: RESET_PASSWORD,
        payload: {
            request: {
                method: 'POST',
                url: '/reset',
                data: {
                    token: token,
                    password: password
                }
            }
        }
    }
}

export function passwordsDoNotMatch() {
    return {
        type: PASSWORDS_DO_NOT_MATCH
    }
}

// action generator for a logout action
export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}

export function updateUploadProgress(progress) {
    return {
        type: UPDATE_UPLOAD_PROGRESS,
        payload: progress
    }
}

export function uploadImage(dispatch, FormData) {
    return {
        type: UPLOAD_IMAGE,
        payload: {
            request: {
                url: '/upload',
                method: 'POST',
                data: FormData,
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        let loaded = Math.round((e.loaded / e.total) * 100);
                        console.log('---progress', loaded);
                        dispatch(updateUploadProgress(loaded));
                    }
                }
            }
        }
    }
}

export function updateTags (tags) {
    return {
        type: UPDATE_TAGS,
        payload: tags
    }
}
