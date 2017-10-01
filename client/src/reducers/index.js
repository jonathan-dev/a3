import { combineReducers } from 'redux';
import { UserAuthentication } from './authentication';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

export const locationChange = (state = {username: ''}, action) => {
  switch (action.type) {
      case LOCATION_CHANGE:
          // delete all unwanted data, add attributes here for global state persistence
          return Object.assign({}, {
              username: state.username
          });
      default:
          return state;
  }
};

export const harrismusApp = combineReducers({
    UserAuthentication,
    locationChange,
    routing: routerReducer,
    form: formReducer
});
