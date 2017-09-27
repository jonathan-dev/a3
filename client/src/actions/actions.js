/**
 * File for declaring actions in our application.
 * Actions are payloads of information that send data from our application to our store.
 * See the react redux actions documentation for further details
 * */

import {
  LOGOUT_USER,
  LOGIN_USER
} from './actionTypes';

export function logOutUser () {
  return {
    type: LOGOUT_USER
  };
}

