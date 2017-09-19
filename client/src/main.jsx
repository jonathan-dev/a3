import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo';

import HeaderBar from '@/HeaderBar/header_bar';
import HotPage from '@/HotPage/hot_page';
import CreatePost from '@/CreatePost/create_post';
import LoginPage from '@/LoginPage/login_page';
import RegisterPage from '@/RegisterPage/register_page';

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
        <Switch>
          <Route exact path="/" component={HotPage}/>
          <Route path="/create" component={CreatePost}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

/**
 * TODO: make navigation bar component out of link list
 */
