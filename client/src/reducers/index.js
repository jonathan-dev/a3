import { combineReducers } from 'redux';

import { UserAuthentication } from './authentication';

import { routerReducer } from 'react-router-redux'

export const harrismusApp = combineReducers({
    UserAuthentication,
    routing: routerReducer
});
