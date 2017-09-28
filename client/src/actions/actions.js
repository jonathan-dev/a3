/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
    LOGIN_USER,
    LOGOUT_USER,
    SUBMIT_LOGIN_INFORMATION,
} from '../constants/actionTypes';

export function createLogoutUserAction() {
    return {
        type: LOGOUT_USER
    };
}

export function createSubmitLoginInformationAction () {
    return {
      type: SUBMIT_LOGIN_INFORMATION
    };
}

export function createLoginUserAction(userData) {
    return {
        type: LOGIN_USER,
        userData
    }
}



