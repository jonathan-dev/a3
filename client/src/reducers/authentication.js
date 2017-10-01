import {
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAIL,
    LOGOUT_USER,
    POST_REGISTRATION_SUCCESS,
    POST_REGISTRATION_FAIL,
    CHECK_RESET_ROUTE_SUCCESS,
    CHECK_RESET_ROUTE_FAIL,
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
                    isAuthenticated: true,
                    username: action.payload.data.username,
                    registrationErrors: null
                }
            );

        case POST_REGISTRATION_FAIL:
            return Object.assign({}, state, {
                registrationErrors: action.error.response.data.errors.slice(0)
            });


            //------------------------------------------
            // REGISTRATION PAGE
            //------------------------------------------
        case POST_LOGIN_SUCCESS:
            return Object.assign({},
                state, {
                    isAuthenticated: true,
                    username: action.payload.data.username,
                    token: action.payload.data.token
                }
            );

        case POST_LOGIN_FAIL:
            return Object.assign({}, state, {
                loginErrors: ['Username or password is incorrect!'].slice(0)
            });

        case LOGOUT_USER:
            return Object.assign({}, state, {
                username: null,
                isAuthenticated: false,
                token: null
            });

        default:
            return state
    }
}
