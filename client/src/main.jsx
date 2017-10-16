/**
 * Provides main app 'entry point'
 * Initialises middleware and app
 */
import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware'; //Allows Axios HTTP requests to be defined as redux actions
import { harrismusApp } from './reducers/index_reducer'
import { routerMiddleware, push } from 'react-router-redux';
import App from './components/app';

//Initialise axios client (http client)
const axiosClient = axios.create({ // all axios can be used, shown in axios documentation
   baseURL: window.location.origin,
});

// Browser history for the Connected router Component, enables redirection and tracks history
const browserHistory = createBrowserHistory();

//Creates redux global state store
let store = createStore(
    harrismusApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware( // apply all middlewares
        //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
        axiosMiddleware(axiosClient)
    )
);

// graphql network interface defining the link to the graqhQL backend
const networkInterface = createNetworkInterface({
  uri: window.location.origin+'/graphql'
});

// apply the middlewares on the graphql network interface
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from Redux store if it exists
    // and add to every request
    const token = store.getState().authentication.token;
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

// create the apollo client providing it with the created graphQL interface
const apolloClient = new ApolloClient({
  networkInterface
});

// wrap the app in order to prevent redirection blockade. Known problem with react router, see
// react router redux documentation for further details
const NoBlockApp = withRouter(App);

//Initialises app with router and middleware
render(
  <ApolloProvider client={apolloClient} store={store}>
    <ConnectedRouter history={browserHistory}>
      <NoBlockApp/>
    </ConnectedRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
