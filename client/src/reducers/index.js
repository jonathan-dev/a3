import { combineReducers } from 'redux';

import { UserAuthentication } from './authentication';
import { FormUpdating } from "./form_reducer";

import { routerReducer } from 'react-router-redux'

export const harrismusApp = combineReducers({
    UserAuthentication,
    FormUpdating,
    routing: routerReducer
});
