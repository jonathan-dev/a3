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
export const CLEAN_REGISTRATION_STATE = 'CLEAN_REGISTRATION_STATE';
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
export const RESET_REQUEST_RESET_PASSWORD = 'RESET_REQUEST_RESET_PASSWORD';

export const REQUEST_RESET_PASSWORD_SUCCESS = 'REQUEST_RESET_PASSWORD_SUCCESS';
export const REQUEST_RESET_PASSWORD_FAIL = 'REQUEST_RESET_PASSWORD_FAIL';


export const EDIT_COMMENT_CLICKED = 'EDIT_COMMENT_CLICKED';
export const EDIT_COMMENT_TEXT_CHANGED = 'EDIT_COMMENT_TEXT_CHANGED';
export const UNDO_EDIT_COMMENT_CLICKED = 'UNDO_EDIT_COMMENT_CLICKED';

export const COMMENT_INPUT_FIELD_CHANGED = 'COMMENT_INPUT_FIELD_CHANGED';
export const CLEAR_COMMENT_INPUT_BAR = 'CLEAR_COMMENT_INPUT_BAR';

export const SHOW_POST_COMMENTS = 'SHOW_POST_COMMENTS';
export const HIDE_POST_COMMENTS = 'HIDE_POST_COMMENTS';

export const POST_SEACHBAR_INPUT_CHANGED = 'POST_SEACHBAR_INPUT_CHANGED';
export const CLEAR_POST_SEARCHBAR_INPUT = 'CLEAR_SEARCHBAR_INPUT';

//------------------------------------------
// CREATE POST PAGE
//------------------------------------------

export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const RESET_STATE = 'RESET_STATE';
