import {
    connect
} from 'react-redux';
import ResetPage from '../components/reset_page'
import {
    checkResetRoute,
    resetPassword,
    routeValidation
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
    console.log('passwords: ', password, password2);
    if (password === password2) {
        console.log('reset password')
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
        routeIsValid: state.authentication.routeIsValid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        check: token => dispatch(checkResetRoute(token)),
        handleSubmit: (event, token) => handleSubmit(dispatch, event, token)
    }
};

const resetForm = reduxForm({
    form: 'ResetForm', // a unique identifier for this form
    validate
})(ResetPage)

export default connect(mapStateToProps, mapDispatchToProps)(resetForm);
