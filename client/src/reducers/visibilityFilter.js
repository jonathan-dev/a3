import { visibilityFilters, SET_VISIBILITY_FILTER } from '../actions/actionTypes';

// unpack the object variables, so that we can use them directly
let {SHOW_ALL} = visibilityFilters;

export function visibilityFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
}
