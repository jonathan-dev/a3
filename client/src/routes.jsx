import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HotPage from '@/HotPage/hot_page';
import CreatePost from '@/CreatePost/create_post';
import LoginPage from '@/LoginPage/login_page';
import RegisterPage from '@/RegisterPage/register_page';

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={HotPage}/>
        <Route path="/create" component={CreatePost}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
      </Switch>
    );
  }
}

export default Routes;
