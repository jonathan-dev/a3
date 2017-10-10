import { connect } from 'react-redux';
import HeaderBar from '../components/header_bar';
import { push } from 'react-router-redux';
import {
    HOME_PATH,
    CREATE_POST_PATH,
    LOGIN_PATH,
    REGISTER_PATH
} from '../paths';

import { logoutUser } from '../actions/actions';


const logout = (dispatch) => {
    console.log("Im here");
    dispatch(logoutUser());
    dispatch(push(HOME_PATH));
};

const mapStateToProps = state => {
    return {
        username: state.authentication.isAuthenticated ? state.authentication.username : null,
        isAuthenticated: state.authentication.isAuthenticated,
        isAdmin: state.authentication.isAdmin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => logout(dispatch)
    }
};

const HeaderBarContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderBar);

export default HeaderBarContainer;
