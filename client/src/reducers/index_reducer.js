/**
 * Combines all reducers into a single reducer object
 * Used to initialise the redux store
 */
import { combineReducers } from 'redux';
import { authentication } from './authentication_reducer';
import { commenting } from './comment_reducers'
import { createPost } from './create_post_reducer';
import { postVisibility } from './post_visibility_reducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

// combines all reducers and returns the concatenated object for the redux store, usage in main.jsx
export const harrismusApp = combineReducers({
    postVisibility,
    authentication,
    commenting,
    createPost,
    routing: routerReducer,
    form: formReducer
});
