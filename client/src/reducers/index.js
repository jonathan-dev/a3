import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { commenting } from './comment_reducers'
import { createPost } from './create_post';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'


export const harrismusApp = combineReducers({
    authentication,
    commenting,
    createPost,
    routing: routerReducer,
    form: formReducer
});
