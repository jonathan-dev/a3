/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
    LOGIN_SUCCEEDED,
    LOGOUT_USER,
    LOGIN_FORM_INPUT_CHANGED,
    POST_LOGIN_INFORMATION
} from '../constants/action_types';

// action generator for a change of values in login page form
export function loginFormInputChanged (changedInput) {
    return {
        type: LOGIN_FORM_INPUT_CHANGED,
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
                username: loginData.username,
                password: loginData.password
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

