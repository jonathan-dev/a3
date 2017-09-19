/**
 * This file contains the logic behind the login and logout persistence of user data
 * */

export function logIn (username, token) {
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
}

export function logOut () {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  window.location.replace('/');
}

export function userIsLoggedIn () {
  return localStorage.getItem('username') && localStorage.getItem('token');
}

export function getUserName () {
  return localStorage.getItem('username');
}
