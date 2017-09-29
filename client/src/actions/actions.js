/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
    LOGIN_SUCCEEDED,
    LOGOUT_USER,
    POST_LOGIN_INFORMATION,
    FORM_INPUT_CHANGED
} from '../constants/action_types';

// action generator for a change of values in form
export function formInputChanged (changedInput) {
    return {
        type: FORM_INPUT_CHANGED,
        changedInput
    };
}

// action generator for posting login information
export function postLoginInformation (loginData) {
    return {
        type: POST_LOGIN_INFORMATION,
        payload: {
            request: {
                url: '/login',
                method: 'POST',
                data: {
                    username: loginData.username,
                    password: loginData.password
                }
            }
        }
    }
}

// action generator for a succeeded login
export function loginSucceeded (userData) {
    return {
        type: LOGIN_SUCCEEDED,
        userData
    }
}

// action generator for a logout action
export function logoutUser () {
    return {
        type: LOGOUT_USER
    };
}

