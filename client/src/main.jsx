import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { harrismusApp } from './reducers/index'

import App from './components/app';

const NonBlockApp = withRouter(App);

const axiosClient = axios.create({ // all axios can be used, shown in axios documentation
   baseURL: window.location.origin,
});

const history = createBrowserHistory();

let store = createStore(
    harrismusApp,
    applyMiddleware( // apply all middlewares
        routerMiddleware(history),
        axiosMiddleware(axiosClient) //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
    )
);

// subscribing to log the store TODO: REMOVE when debugging is done
let x = store.subscribe(() => {
    console.log("state changed:");
    console.log(store.getState());
});

const networkInterface = createNetworkInterface({
  uri: window.location.origin+'/graphql'
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const apolloClient = new ApolloClient({
  networkInterface
});

const browserHistory = createBrowserHistory();

render(
  <ApolloProvider client={apolloClient} store={store}>
    <ConnectedRouter history={browserHistory}>
      <NonBlockApp/>
    </ConnectedRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
