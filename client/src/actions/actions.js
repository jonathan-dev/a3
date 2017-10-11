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
    EDIT_COMMENT_CLICKED,
    UNDO_EDIT_COMMENT_CLICKED,
    EDIT_COMMENT_TEXT_CHANGED,
    UPDATE_UPLOAD_PROGRESS,
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

export function undoEditCommentClicked (comment) {
    return {
        type: UNDO_EDIT_COMMENT_CLICKED,
        comment
    }
}
