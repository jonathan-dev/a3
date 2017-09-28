/**
 * This file stores the action types used in the actions.js.
 * */

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const SET_HEADER_BAR_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// visibility filter types for the application
export const headerBarVisibilityFilters = {
  SHOW_AUTHENTICATED: 'SHOW_AUTHENTICATED',
  SHOW_UNAUTHENTICATED: 'SHOW_UNAUTHENTICATED'
};
