import {
    connect
} from 'react-redux';
import {
    postRegistration,
    showRegistrationFormErrors,
    clearRegistrationFormErrors
} from '../actions/actions';
import RegisterPage from '../components/register_page'
import { reduxForm } from 'redux-form'
// THIS FILE HAS NOT BEEN UPDATED ENTIRELY FOR REDUX USAGE TODO: implement container

//Handles submission of register form TODO: NOT IMPLEMENTED YET, CORRECT IMPLEMENTATION
const handleSubmit = (dispatch, event) => {
    event.preventDefault(); //Stops page refresh

    // extract formdata to object
    let formData = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
        password2: event.target.password2.value, // don't send password2 to the server, trim object before request
    };

    // trim to only relevant data for request
    let trimmedFormData = {
        username: formData.username,
        password: formData.password,
        email: formData.email
    };

    dispatch(postRegistration(trimmedFormData));
};

const validate = values => {
    const errors = {}
    const requiredFields = [
        'username',
        'email',
        'password',
        'password2'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    if(values.password2 && values.password2.length >0 && values.password2 != values.password) {
        errors.password2 = 'Password does not match'
    }
    return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// TODO: check if username is available!
const asyncValidate = (values /*, dispatch */ ) => {
    return sleep(1000).then(() => {
        // simulate server latency
        if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
            // eslint-disable-next-line no-throw-literal
            throw {
                email: 'Email already Exists'
            }
        }
    })
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated || false,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (event) => handleSubmit(dispatch, event),
    }
};

const registerForm = reduxForm({
    form: 'ResetForm', // a unique identifier for this form
    validate,
    asyncValidate
})(RegisterPage)


export default connect(mapStateToProps, mapDispatchToProps)(registerForm);
