/**
 * This file stores the action types used in the actions.js.
 * */

export const FORM_INPUT_CHANGED = 'FORM_INPUT_CHANGED';
export const LOGOUT_USER = 'LOGOUT_USER';

//------------------------------------------
// LOGIN PAGE
//------------------------------------------
export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAIL = 'POST_LOGIN_FAIL';

//------------------------------------------
// REGISTRATION PAGE
//------------------------------------------
export const POST_REGISTRATION = 'POST_REGISTRATION';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_FAIL = 'POST_REGISTRATION_FAIL';


// visibility filter types for the application
export const headerBarVisibilityFilters = {
    SHOW_AUTHENTICATED: 'SHOW_AUTHENTICATED',
    SHOW_UNAUTHENTICATED: 'SHOW_UNAUTHENTICATED'
};

//------------------------------------------
// RESET PAGE
//------------------------------------------
export const CHECK_RESET_ROUTE = 'CHECK_RESET_ROUTE';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const CHECK_RESET_ROUTE_SUCCESS = 'CHECK_RESET_ROUTE_SUCCESS';
export const CHECK_RESET_ROUTE_FAIL = 'CHECK_RESET_ROUTE_FAIL';

//------------------------------------------
// FORGOT PAGE
//------------------------------------------

export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';

export const REQUEST_RESET_PASSWORD_SUCCESS = 'REQUEST_RESET_PASSWORD_SUCCESS';
export const REQUEST_RESET_PASSWORD_FAIL = 'REQUEST_RESET_PASSWORD_FAIL';


//------------------------------------------
// CREATE POST PAGE
//------------------------------------------

export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
