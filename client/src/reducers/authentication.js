/**
 * Authentication reducers
 * */

import {
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAIL,
    LOGOUT_USER,
    headerBarVisibilityFilters,
    CHECK_RESET_ROUTE_SUCCESS,
    CHECK_RESET_ROUTE_FAIL
} from '../constants/action_types';


// unpack the object attributes
let {
    SHOW_AUTHENTICATED,
    SHOW_UNAUTHENTICATED
} = headerBarVisibilityFilters;

// initial state object for first rendering
const logoutUserState = {
    username: '',
    isAuthenticated: false,
    headerBarVisibilityFilter: SHOW_UNAUTHENTICATED
};

// initialState is loggedOutUser state, change this here if you want to change the initial state
const initialState = logoutUserState;

/**
 * Apply logout or login adjustments on the state depending on the action type.
 * Note that the original state object wont get overwritten.
 * ALWAYS use an empty object as first parameter and the original state as second
 * parameter with Object.assign, as we would overwrite the whole existing state otherwise.
 * */
export function UserAuthentication(state = initialState, action) {
    switch (action.type) {
        //------------------------------------------
        // LOGIN PAGE
        //------------------------------------------
        case POST_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,

            }); // TODO: implement
        case POST_LOGIN_FAIL:
            return Object.assign({}, state, {}); // TODO: implement
        case LOGOUT_USER:
            return Object.assign({}, state, logoutUserState);

        //------------------------------------------
        // RESET PAGE
        //------------------------------------------
        case CHECK_RESET_ROUTE_SUCCESS:
            return Object.assign({}, state, { routeIsValid: true });

        case CHECK_RESET_ROUTE_FAIL:
            return Object.assign({}, state, { routeIsValid: false});

        default:
            return Object.assign({}, state, initialState);
    }
}
