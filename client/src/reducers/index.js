import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'


export const harrismusApp = combineReducers({
    authentication,
    routing: routerReducer,
    form: formReducer
});
