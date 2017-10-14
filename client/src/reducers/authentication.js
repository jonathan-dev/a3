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
    CLEAN_REGISTRATION_STATE
} from '../constants/action_types';

export function authentication(state = {}, action) {
    switch (action.type) {

        //------------------------------------------
        // RESET ROUTE
        //------------------------------------------
        case CHECK_RESET_ROUTE_SUCCESS:
            return Object.assign({}, state, {
                routeIsValid: true
            });

        case CHECK_RESET_ROUTE_FAIL:
            return Object.assign({}, state, {
                routeIsValid: false
            });

            //------------------------------------------
            // REGISTRATION PAGE
            //------------------------------------------
        case POST_REGISTRATION_SUCCESS:
            console.log("Success");
            return Object.assign({},
                state, {
                    registrationCompleted: true,
                    registrationErrors: null
                }
            );

        case POST_REGISTRATION_FAIL:
            return Object.assign({}, state, {
                registrationErrors: action.error.response.data.errors.slice(0)
            });

        case CLEAN_REGISTRATION_STATE:
            return Object.assign({}, state, {
                registrationErrors: null,
                registrationCompleted: null
            });


            //------------------------------------------
            // LOGIN PAGE
            //------------------------------------------
        case POST_LOGIN_SUCCESS:
            console.log("Logged in successfully");
            console.log("Payload is ", action.payload.data);
            return Object.assign({},
                state, {
                    isAuthenticated: true,
                    username: action.payload.data.username,
                    isAdmin: action.payload.data.isAdmin,
                    token: action.payload.data.token,
                    loginErrors: null
                }
            );

        case POST_LOGIN_FAIL:
            return Object.assign({}, state, {
                loginErrors: ['Username or password is incorrect!'].slice(0)
            });

        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                username: null,
                isAdmin: false,
                token: null,
                registrationCompleted: false
            });

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

        case RESET_REQUEST_RESET_PASSWORD:
            return Object.assign({}, state, {
                resetInfo: null
            });


        default:
            return state
    }
}
