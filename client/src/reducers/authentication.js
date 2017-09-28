/**
 * Authentication reducers
 * */

import {LOGIN_USER, LOGOUT_USER, headerBarVisibilityFilters} from '../constants/actionTypes';

// unpack the object attributes
let { SHOW_AUTHENTICATED, SHOW_UNAUTHENTICATED } = headerBarVisibilityFilters;

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
export function applyUserAuthentication (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, action.userData, { headerBarVisibilityFilter: SHOW_AUTHENTICATED });
    case LOGOUT_USER: return Object.assign({}, state, logoutUserState);
    default: return Object.assign({}, state, initialState);
  }
}
