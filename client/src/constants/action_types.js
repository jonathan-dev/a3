/**
 * This file stores the action types used in the actions.js.
 * */

export const FORM_INPUT_CHANGED = 'FORM_INPUT_CHANGED';

export const LOGOUT_USER = 'LOGOUT_USER';

// Login action types
export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAIL = 'POST_LOGIN_FAIL';

// Registration action types
export const POST_REGISTRATION = 'POST_REGISTRATION';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_FAIL = 'POST_REGISTRATION_FAIL';


// visibility filter types for the application
export const headerBarVisibilityFilters = {
    SHOW_AUTHENTICATED: 'SHOW_AUTHENTICATED',
    SHOW_UNAUTHENTICATED: 'SHOW_UNAUTHENTICATED'
};
// Password Reset
export const CHECK_RESET_ROUTE = 'CHECK_RESET_ROUTE';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const CHECK_RESET_ROUTE_SUCCESS = 'CHECK_RESET_ROUTE_SUCCESS';
export const CHECK_RESET_ROUTE_FAIL = 'CHECK_RESET_ROUTE_FAIL';
