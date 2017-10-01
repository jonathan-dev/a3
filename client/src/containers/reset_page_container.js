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

const handleSubmit = (dispatch, event, token) => {
    event.preventDefault();
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    console.log('passwords: ', password, password2);
    if (password === password2) {
        console.log('reset password')
        dispatch(resetPassword(token, password));
    }
};

const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password,
        routeIsValid: state.reset.routeIsValid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        check: token => dispatch(checkResetRoute(token)),
        handleSubmit: (event, token) => handleSubmit(dispatch, event, token)
    }
};

const ResetPageContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPage);

export default ResetPageContainer;
