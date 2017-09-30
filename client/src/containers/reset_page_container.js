import {
    connect
} from 'react-redux';
import ResetPage from '@/reset_page'
import {
    checkResetRoute,
    resetPassword,
    routeValidation
} from '../actions/actions';
import {
    push
} from 'react-router-redux';

const handleSubmit = (dispatch, event) => {
    event.preventDefault();
    let formData = {
        username: event.target.username.value,
        password: event.target.password.value
    };
    console.log("Attempting login with data:");
    console.log(formData);
    dispatch(postLoginInformation(formData))
        .then(e => {
            console.log("succeeded in login!");
            console.log("Rerouting to home page");
            console.log(e);
            dispatch(push('/'));
        })
        .catch(err => {
            console.log("failed to login");
            console.log(err)
        });
};

const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password,
        routeIsValid: state.UserAuthentication.routeIsValid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        check: token => dispatch(checkResetRoute(token))
    }
};

const ResetPageContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPage);

export default ResetPageContainer;
