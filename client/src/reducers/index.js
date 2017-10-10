import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { createPost } from './createPost';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'


export const harrismusApp = combineReducers({
    authentication,
    createPost,
    routing: routerReducer,
    form: formReducer
});
