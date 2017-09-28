import { connect } from 'react-redux';
import { headerBarVisibilityFilters } from '../actions/actionTypes'
import { authenticatedHeaderBarLinks, unauthenticatedHeaderBarLinks } from '../components/HeaderBar/header_bar_links';
import { createLoginUserAction, createLogoutUserAction } from '../actions/actions';
import HeaderBar from '../components/HeaderBar/header_bar';


// unpack the attributes using array destructuring (ES6)
let { SHOW_AUTHENTICATED, SHOW_UNAUTHENTICATED } = headerBarVisibilityFilters;

const getVisibleHeaderBarLinks = filter => {
  switch (filter) {
    case SHOW_AUTHENTICATED: return authenticatedHeaderBarLinks.slice(0);
    case SHOW_UNAUTHENTICATED: return unauthenticatedHeaderBarLinks.slice(0);
    default: return unauthenticatedHeaderBarLinks.slice(0);
  }
};

const mapStateToProps = state => {
  return {
    headerBarLinks: getVisibleHeaderBarLinks(state.headerBarVisibilityFilter)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: () => dispatch(createLogoutUserAction()),
    onLoginClick: userData => dispatch(createLoginUserAction(userData))
  }
};

const VisibleHeaderBarLinks = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
