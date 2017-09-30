/**
 * Authentication reducers
 * */

import {
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAIL,
    LOGOUT_USER,
    CHECK_RESET_ROUTE_SUCCESS,
    CHECK_RESET_ROUTE_FAIL,
    PASSWORDS_DO_NOT_MATCH,
    POST_REGISTRATION_SUCCESS,
    POST_REGISTRATION_FAIL, SHOW_REGISTRATION_FORM_ERORRS, CLEAR_REGISTRATION_FORM_ERRORS
} from '../constants/action_types';

/**
 * Apply logout or login adjustments on the state depending on the action type.
 * Note that the original state object wont get overwritten.
 * ALWAYS use an empty object as first parameter and the original state as second
 * parameter with Object.assign, as we would overwrite the whole existing state otherwise.
 * */
export function UserAuthentication(state = {}, action) {
    switch (action.type) {
        //------------------------------------------
        // LOGIN PAGE
        //------------------------------------------
        case POST_LOGIN_SUCCESS:
            return Object.assign(
                {},
                state,
                { isAuthenticated: true, username: action.payload.data.username }
            );
        case POST_LOGIN_FAIL:
            return Object.assign({}, state, { isAuthenticated: false }); // TODO: implement error submission to state
        case LOGOUT_USER:
            return Object.assign({}, state, { username: null, isAuthenticated: false });

        //------------------------------------------
        // REGISTRATION PAGE
        //------------------------------------------
        case POST_REGISTRATION_SUCCESS:
            console.log("Success");
            return Object.assign(
                {},
                state,
                { isAuthenticated: true, username: action.payload.data.username, registrationErrors: null }
            );
        case POST_REGISTRATION_FAIL:
            let errorMessages = action.error.response.data.errors;
            return Object.assign({}, state, { registrationErrors: errorMessages.slice(0) });
        case SHOW_REGISTRATION_FORM_ERORRS:
            return Object.assign({}, state, { registrationErrors: action.errors.slice(0) });
        case CLEAR_REGISTRATION_FORM_ERRORS:
            return Object.assign({}, state, { registrationErrors: null} );

        //------------------------------------------
        // RESET PAGE
        //------------------------------------------
        case CHECK_RESET_ROUTE_SUCCESS:
            return Object.assign({}, state, { routeIsValid: true });

        case CHECK_RESET_ROUTE_FAIL:
            return Object.assign({}, state, { routeIsValid: false});

        case PASSWORDS_DO_NOT_MATCH:
            return Object.assign({}, state, {passwordsMatch: false})

        default:
            return state
    }
}
