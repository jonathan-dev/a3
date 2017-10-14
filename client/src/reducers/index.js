import { combineReducers } from 'redux';
import { authentication } from './authentication_reducer';
import { commenting } from './comment_reducers'
import { createPost } from './create_post';
import { postVisibility } from './post_visibility_reducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'


export const harrismusApp = combineReducers({
    postVisibility,
    authentication,
    commenting,
    createPost,
    routing: routerReducer,
    form: formReducer
});
