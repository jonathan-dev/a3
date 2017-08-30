import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

import Post from './components/Post/post.jsx'

render(
    <Router>
        <Route path="/" component={Post}/>
    </Router>,
    document.getElementById('root')
);