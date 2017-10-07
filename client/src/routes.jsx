/**
 * This file contains all the routes for the react application
 * */

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './containers/login_page_container';
import ResetPage from './containers/reset_page_container';
import HotPage from '@/hot_page';
import PostDetailsPage from '@/post_details';
import CreatePost from '@/create_post';
import RegisterPage from './containers/register_page_container';
import ForgotPage from './containers/forgot_page_container';
import ProfilePage from '@/profile_page';
import AdminPage from '@/admin_page';

import {
  HOME_PATH,
  CREATE_POST_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  POST_DETAIL_PATH,
  USER_PROFILE_PATH,
  ADMIN_PATH
} from './paths';

class Routes extends Component {
  // enter all routes for the application here
  render () {
    return (
      <Switch>
        <Route exact path={HOME_PATH} component={HotPage}/>
        <Route path={CREATE_POST_PATH} component={CreatePost}/>
        <Route path={LOGIN_PATH} component={LoginPage}/>
        <Route path={REGISTER_PATH} component={RegisterPage}/>
        <Route path={FORGOT_PASSWORD_PATH} component={ForgotPage}/>
        <Route path={RESET_PASSWORD_PATH} component={ResetPage}/>
        <Route path={POST_DETAIL_PATH} component={PostDetailsPage}/>
        <Route path={USER_PROFILE_PATH} component={ProfilePage}/>
        <Route path={ADMIN_PATH} component={AdminPage}/>
      </Switch>
    );
  }
}

export default Routes;
