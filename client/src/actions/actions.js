/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
    LOGIN_USER,
    LOGOUT_USER,
    LOGIN_FORM_INPUT_CHANGED,
    POST_LOGIN_INFORMATION,
    REROUTE
} from '../constants/actionTypes';

export function createLogoutUserAction() {
    return {
        type: LOGOUT_USER
    };
}

export function createLoginFormInputChangedAction (changedInput) {
    return {
        type: LOGIN_FORM_INPUT_CHANGED,
        changedInput
    };
}

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

export function reroute (path) {
    return {
        type: REROUTE,
        path
    }
}

export function createLoginUserAction (userData) {
    return {
        type: LOGIN_USER,
        userData
    }
}



