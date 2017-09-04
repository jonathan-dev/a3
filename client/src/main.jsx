import React, { Component } from 'react';
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
import HotPage from '@/HotPage/hot_page';
import CreatePost from '@/CreatePost/create_post';

const networkInterface = createNetworkInterface({
  uri: window.location.origin+'/graphql'
});

const client = new ApolloClient({
  networkInterface
})

render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">create</Link></li>
          <li><Link to="/hot">hot</Link></li>
        </ul>
        <Switch>
        <Route exact path="/" component={HotPage}/>
        <Route path="/create" component={CreatePost}/>
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

/**
 * TODO: make navigation bar component out of link list
 */
