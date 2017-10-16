/**
 * Container for the registartion page.
 * This file handles all the logic behind the register page
 * and maps the current state to the props which is rednered by the component.
 * */
import {
    connect
} from 'react-redux';
import {
    postRegistration,
    clearAuthentication
} from '../actions/actions';
import RegisterPage from '../components/registration_page';
import {
    reduxForm
} from 'redux-form';
import axios from 'axios'

//Handles submission of register form
const handleSubmit = (dispatch, event) => {
    event.preventDefault(); //Stops page refresh

    // extract form-data to object
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

/**
 * Tests if a string is a valid email address
 * @param {String} string - The email address as string to check
 */
const stringIsEmail = string => {
    // email regular expression to test if string is an valid email address string
    let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (string) {
        // if string is not empty, test if it matches the email regex
        return emailRegEx.test(string)
    }
    return false;
};

/**
 * Locally validates all given registration details and returns any problems
 * @param {RegistrationValues} values - Json containing username, email, password1 and password2
 */
const validate = values => {
    const errors = {};

    // define the required fields in the form
    const requiredFields = [
        'username',
        'email',
        'password',
        'password2'
    ];

    // check if a required field is empty
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });

    //Ensure email address is valid
    if (values.email && !stringIsEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    //Ensure passwords match
    if (values.password2 && values.password2.length > 0 && values.password2 != values.password) {
        errors.password2 = 'Password does not match'
    }
    return errors
};

/**
 * Validates given registration details against the server
 * @param {RegistrationValues} values - Json containing username, email, password1 and password2
 */
const asyncValidate = (values) => {
    return axios({
            method: 'post',
            url: '/validateRegistration',
            data: {
                email: values.email,
                username: values.username
            }
        })
        .then(res => {
            //Checks response and throws errors accordingly
            const {email, username} = res.data
            if(email === "taken" && username === "taken") {
                throw {
                    email: 'Email already Exists',
                    username: 'Username already Exists'
                }
            }else{
                if (email === "taken") {
                    throw {
                        email: 'Email already Exists'
                    }
                }
                if (username === "taken") {
                    throw {
                        username: 'Username already Exists'
                    }
                }
            }
        })
}

/**
 * Maps all state objects to props that the component needs to display
 * @param {ReduxState} state
 */
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated || false,
        registrationCompleted: state.authentication.registrationCompleted
    }
};

/**
 * Maps all functions to props that component needs to call
 * @param {ReduxDispatch} dispatch
 */
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (event) => handleSubmit(dispatch, event),
        clearAuthenticationState: () => dispatch(clearAuthentication())
    }
};

/**
 * Creates component as a redux form
 */
const registerForm = reduxForm({
    form: 'RegisterForm', // a unique identifier for this form
    validate,
    asyncValidate
})(RegisterPage)


export default connect(mapStateToProps, mapDispatchToProps)(registerForm);
