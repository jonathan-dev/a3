import { combineReducers } from 'redux';
import { applyUserAuthentication } from './authentication';

const harrismusApp = combineReducers({
  applyUserAuthentication
});

export default harrismusApp;
