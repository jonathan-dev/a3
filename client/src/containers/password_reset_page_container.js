import {
    connect
} from 'react-redux';
import ResetPage from '../components/password_reset_page'
import {
    checkResetRoute,
    resetPassword,
    clearAuthentication
} from '../actions/actions';
import {
    push
} from 'react-router-redux';
import {
    reduxForm
} from 'redux-form';

const handleSubmit = (dispatch, event, token) => {
    event.preventDefault();
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    if (password === password2) {
        dispatch(resetPassword(token, password));
    }
};

const validate = values => {
    const errors = {}
    const requiredFields = [
        'password',
        'password2'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.password2 && values.password2.length > 0 && values.password2 != values.password) {
        errors.password2 = 'Password does not match'
    }
    return errors
}

const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password,
        routeIsValid: state.authentication.routeIsValid,
        passwordResetCompleted: state.authentication.passwordResetCompleted
    };
};

const mapDispatchToProps = dispatch => {
    return {
        check: token => dispatch(checkResetRoute(token)),
        handleSubmit: (event, token) => handleSubmit(dispatch, event, token),
        clearAuthentication: () => clearAuthentication()
    }
};

const resetForm = reduxForm({
    form: 'ResetForm', // a unique identifier for this form
    validate
})(ResetPage)

export default connect(mapStateToProps, mapDispatchToProps)(resetForm);
