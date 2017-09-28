/**
 * This file contains all the routes for the react application
 * */

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HotPage from '@/HotPage/hot_page';
import PostDetailsPage from '@/PostDetails/post_details';
import CreatePost from '@/CreatePost/create_post';
import LoginPage from '@/LoginPage/login_page';
import LogoutPage from '@/LogoutPage/logout_page';
import RegisterPage from '@/RegisterPage/register_page';
import ResetPage from '@/ResetPage/reset_page';
import ForgotPage from '@/ForgotPage/forgot_page';
import ProfilePage from '@/ProfilePage/profile_page';

import {
  HOME_PATH,
  CREATE_POST_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  REGISTER_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  POST_DETAIL_PATH,
  USER_PROFILE_PATH
} from './paths';

class Routes extends Component {
  // enter all routes for the application here
  render () {
    return (
      <Switch>
        <Route exact path={HOME_PATH} component={HotPage}/>
        <Route path={CREATE_POST_PATH} component={CreatePost}/>
        <Route path={LOGIN_PATH} component={LoginPage}/>
        <Route path={LOGOUT_PATH} component={LogoutPage}/>
        <Route path={REGISTER_PATH} component={RegisterPage}/>
        <Route path={FORGOT_PASSWORD_PATH} component={ForgotPage}/>
        <Route path={RESET_PASSWORD_PATH} component={ResetPage}/>
        <Route path={POST_DETAIL_PATH} component={PostDetailsPage}/>
        <Route path={USER_PROFILE_PATH} component={ProfilePage}/>
      </Switch>
    );
  }
}

export default Routes;
