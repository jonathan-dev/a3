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
import axiosMiddleware from 'redux-axios-middleware';
import { harrismusApp } from './reducers/index'
import { routerMiddleware, push } from 'react-router-redux';
import App from './components/app';


const axiosClient = axios.create({ // all axios can be used, shown in axios documentation
   baseURL: window.location.origin,
});
const browserHistory = createBrowserHistory();
const middleWare = routerMiddleware(browserHistory);


let store = createStore(
    harrismusApp,
    applyMiddleware( // apply all middlewares
        axiosMiddleware(axiosClient) //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix,
        , middleWare
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
    const token = store.getState().UserAuthentication.token;
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const apolloClient = new ApolloClient({
  networkInterface
});

const NoBlockApp = withRouter(App);

render(
  <ApolloProvider client={apolloClient} store={store}>
    <ConnectedRouter history={browserHistory}>
      <NoBlockApp/>
    </ConnectedRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
