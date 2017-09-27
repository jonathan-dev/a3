/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
  LOGIN_USER,
  LOGOUT_USER
} from './actionTypes';

export function logoutUser () {
  return {
    type: LOGOUT_USER
  };
}

export function loginUser (userData) {
  return {
    type: LOGIN_USER,
    userData
  }
}



