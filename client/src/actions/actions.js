/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
    LOGOUT_USER,
    POST_LOGIN_INFORMATION,
    CHECK_RESET_ROUTE,
    RESET_PASSWORD
} from '../constants/action_types';

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

export function checkResetRoute (token) {
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

export function resetPassword (token, password) {
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
// action generator for posting login information
export function postRegistrationInformation (registrationData) {
    return {
        type: POST_LOGIN_INFORMATION,
        payload: {
            request: {
                url: '/register',
                method: 'POST',
                data: {
                    username: registrationData.username,
                    password: registrationData.password,
                    email: registrationData.email
                }
            }
        }
    }
}

// action generator for a logout action
export function logoutUser () {
    return {
        type: LOGOUT_USER
    };
}

