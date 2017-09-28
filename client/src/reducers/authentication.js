/**
 * Authentication reducers
 * */

import {LOGIN_USER, LOGOUT_USER} from '../actions/actionTypes';

// initial state object for first rendering
const initialState = {
  username: '',
  isAuthenticated: false
};

/**
 * Apply logout or login adjustments on the state depending on the action type.
 * Note that the original state object wont get overwritten.
 * ALWAYS use an empty object as first parameter and the original state as second
 * parameter with Object.assign, as we would overwrite the whole existing state otherwise.
 * */
export function applyUserAuthentication (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: return Object.assign({}, state, action.userData);
    case LOGOUT_USER: return Object.assign({}, state, initialState);
    default: return state;
  }
}
