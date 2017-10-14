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
    RESET_REQUEST_RESET_PASSWORD,
    EDIT_COMMENT_CLICKED,
    UNDO_EDIT_COMMENT_CLICKED,
    EDIT_COMMENT_TEXT_CHANGED,
    UPDATE_UPLOAD_PROGRESS,
    SHOW_POST_COMMENTS,
    HIDE_POST_COMMENTS,
    POST_SEACHBAR_INPUT_CHANGED,
    CLEAR_POST_SEARCHBAR_INPUT,
    COMMENT_INPUT_FIELD_CHANGED,
    CLEAR_COMMENT_INPUT_BAR,
    CLEAN_REGISTRATION_STATE
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

export function clearRegistrationState () {
    return {
        type: CLEAN_REGISTRATION_STATE
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

export function resetRequestPasswordRequest(){
    return {
        type: RESET_REQUEST_RESET_PASSWORD
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

export function editCommentClicked (comment) {
    return {
        type: EDIT_COMMENT_CLICKED,
        comment
    }
}

export function editCommentTextChanged (newCommentText) {
    return {
        type: EDIT_COMMENT_TEXT_CHANGED,
        newCommentText: newCommentText
    }
}

export function undoEditCommentClicked () {
    return {
        type: UNDO_EDIT_COMMENT_CLICKED,
    }
}

export function showPostComments (post) {
    return {
        type: SHOW_POST_COMMENTS,
        post: post
    }
}

export function hidePostComments (post) {
    return {
        type: HIDE_POST_COMMENTS,
        post: post
    }
}

export function updatePostSearchBarInput (newInput) {
    return {
        type: POST_SEACHBAR_INPUT_CHANGED,
        newInput: newInput
    }
}

export function clearSearchBarInput () {
    return {
        type: CLEAR_POST_SEARCHBAR_INPUT
    }
}

export function updateCommentInputBar (newInput) {
    return {
        type: COMMENT_INPUT_FIELD_CHANGED,
        newInput: newInput
    }
}

export function clearCommentInputBar () {
    return {
        type: CLEAR_COMMENT_INPUT_BAR
    }
}
