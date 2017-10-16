/**
 * File for declaring actions in our application.
 * Actions are payloads of information with a specific purpose,
 *      that send data from our application to our store.
 * See the react redux actions documentation for further details.
 *
 * Note: Actions with payload:request are redux-axios-middleware actions.
 *       They allow axios HTTP requests to be defined and dispatched as redux actions.
 *       Middleware will dispatch a _SUCCESS or _FAIL action when HTTP request is fulfilled.
*  See redux-axios-middleware docs and reducers/user_authentication.js for more info.
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
    CLEAR_AUTHENTICATION_STATE,
    RESET_PASSWORD_SUCCESS
} from '../constants/action_types';

/**
 * Action generator for posting login information
 * @param {LoginData} loginData - Object containing username & pw
 */
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

/**
 * Action generator for posting login information
 * @param {RegistrationData} registrationData - Object containing username, pw, email
 */
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

/**
 * action generator for clearing rego state
 */
export function clearRegistrationState () {
    return {
        type: CLEAR_AUTHENTICATION_STATE
    }
}

/**
 * action generator for posting a password reset request
 */
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

/**
 * action generator for removing a password reset request (unused)
 */
export function resetRequestPasswordRequest(){
    return {
        type: RESET_REQUEST_RESET_PASSWORD
    }
}

/**
 * action generator for request to confirm that reset token is valid
 * (valid = not fake or expired)
 */
// (valid = not fake or expired)
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

// action generator for reset password
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

export function clearAuthentication () {
    return {
        type: CLEAR_AUTHENTICATION_STATE
    }
}
