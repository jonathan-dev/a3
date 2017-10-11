import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { commenting } from './comment_reducers'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'


export const harrismusApp = combineReducers({
    authentication,
    commenting,
    routing: routerReducer,
    form: formReducer
});
