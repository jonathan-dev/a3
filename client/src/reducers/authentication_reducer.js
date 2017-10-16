/**
 * Handles all redux actions related to login and authentication, modifies the state accordingly.
 *
 * Note: Reducers with _SUCCESS or _FAIL are dispatched by redux-axios-middleware.
 * Each reducer (case) returns updated state object. Refer to redux docs for more info.
 */
import {
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAIL,
    LOGOUT_USER,
    POST_REGISTRATION_SUCCESS,
    POST_REGISTRATION_FAIL,
    CHECK_RESET_ROUTE_SUCCESS,
    CHECK_RESET_ROUTE_FAIL,
    REQUEST_RESET_PASSWORD_SUCCESS,
    REQUEST_RESET_PASSWORD_FAIL,
    RESET_REQUEST_RESET_PASSWORD,
    CLEAN_REGISTRATION_STATE,
    CLEAR_AUTHENTICATION_STATE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from '../constants/action_types';

const initialState = {
    username: null,
    isAuthenticated: false,
    isAdmin: false,
    token: null,
    routeIsValid: false, // dynamic reset password route
    registrationErrors: null,
    registrationCompleted: false,
    resetInfo: null,
    passwordResetCompleted: false,
    resetPasswordErrors: []
};

export function authentication(state = initialState, action) {
    switch (action.type) {

        //------------------------------------------
        // RESET ROUTE
        //------------------------------------------
        case CHECK_RESET_ROUTE_SUCCESS:
            return Object.assign({}, state, { routeIsValid: true });

        case CHECK_RESET_ROUTE_FAIL:
            return Object.assign({}, state, { routeIsValid: false });

        case RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, { passwordResetCompleted: true });

        case RESET_PASSWORD_FAIL:
            let errorMessage = "Error resetting password, please try again later";
            return Object.assign({}, state, {
                resetPasswordErrors: state.resetPasswordErrors.concat([errorMessage.slice(0)])
            });

        //------------------------------------------
        // REGISTRATION PAGE
        //------------------------------------------
        case POST_REGISTRATION_SUCCESS:
            return Object.assign({}, state, {
                    registrationCompleted: true,
                    registrationErrors: null
                }
            );

        case POST_REGISTRATION_FAIL:
            return Object.assign({}, state, {
                // server is responding with array of errors, return a copy to the state
                registrationErrors: action.error.response.data.errors.slice(0)
            });

        //------------------------------------------
        // LOGIN PAGE
        //------------------------------------------
        case POST_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                    isAuthenticated: true,
                    username: action.payload.data.username,
                    isAdmin: action.payload.data.isAdmin,
                    token: action.payload.data.token,
                    loginErrors: null
                }
            );

        case POST_LOGIN_FAIL:
            return Object.assign({}, state, {
                loginErrors: action.error.response.data.reason
            });

        case LOGOUT_USER:
            // initial state when no authentication was provided yet, reset state to that state
            return Object.assign({}, state, initialState);

        //------------------------------------------
        // FORGOT PAGE
        //------------------------------------------
        case REQUEST_RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                resetInfo: 'success'
            });

        case REQUEST_RESET_PASSWORD_FAIL:
            return Object.assign({}, state, {
                resetInfo: 'fail'
            });

        case CLEAR_AUTHENTICATION_STATE:
            return Object.assign({}, state, initialState);

        default:
            return state
    }
}
