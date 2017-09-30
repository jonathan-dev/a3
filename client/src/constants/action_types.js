/**
 * This file stores the action types used in the actions.js.
 * */

export const FORM_INPUT_CHANGED = 'FORM_INPUT_CHANGED';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const POST_LOGIN_INFORMATION = 'POST_LOGIN_INFORMATION';

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
