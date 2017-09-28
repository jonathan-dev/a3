/**
 * This file stores the action types used in the actions.js.
 * */

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const SUBMIT_LOGIN_INFORMATION = 'SUBMIT_LOGIN_INFORMATION';
export const SUBMIT_LOGIN_INFORMATION_ERROR = 'SUBMIT_LOGIN_INFORMATION_ERROR';
export const SUBMIT_LOGIN_INFORMATION_SUCCESS = 'SUBMIT_LOGIN_INFORMATION_SUCCESS';

export const SET_HEADER_BAR_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// visibility filter types for the application
export const headerBarVisibilityFilters = {
  SHOW_AUTHENTICATED: 'SHOW_AUTHENTICATED',
  SHOW_UNAUTHENTICATED: 'SHOW_UNAUTHENTICATED'
};
