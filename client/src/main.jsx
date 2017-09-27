import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo';



import HeaderBar from '@/HeaderBar/header_bar';
import Routes from './routes';


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

const client = new ApolloClient({
  networkInterface
});

render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <HeaderBar/>
        <Routes/>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
