import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';

import HotPage from '@/HotPage/hot_page';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/graphql'
});

const client = new ApolloClient({
  networkInterface
})

render(
  <ApolloProvider client={client}>
    <Router>
        <Route path="/" component={HotPage}/>
    </Router>
  </ApolloProvider>,
    document.getElementById('root')
);
