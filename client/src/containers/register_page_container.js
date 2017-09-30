import { connect } from 'react-redux';
import { formInputChanged, postRegistrationInformation } from '../actions/actions';
// THIS FILE HAS NOT BEEN UPDATED ENTIRELY FOR REDUX USAGE TODO: implement container

    //Handles changes in the input fields on the page
    const handleChange = (dispatch, event, getFormInputErrors) => {
        const name = event.target.name;
        const value = event.target.value;
        let errors = [];
        errors.concat(getFormInputErrors());

        let changeState = {
            [name]: value,
            errors: errors.slice(0)
        };
        dispatch(formInputChanged(changeState));
    };

    //Handles submission of register form TODO: NOT IMPLEMENTED YET, CORRECT IMPLEMENTATION
    const handleSubmit = (dispatch, event, formInputIsValid) => {
        event.preventDefault(); //Stops page refresh

        let formData = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            password2: event.target.password2.value,
        }

        if(formInputIsValid(formData)) {
            // trim to only relevant data for request
            let trimmedFormData = {
                username: formData.username,
                password: formData.password,
                email: formData.email
            };
            dispatch(postRegistrationInformation(trimmedFormData))
                .then(event => {
                    // do stuff TODO: implement
                })
                .catch(error => {
                    // something went wrong TODO: implement error handling
                })
        }
    };

    // checks whether all input is correct and valid for submission
    const formInputIsValid = (formData) => getFormInputErrors(formData).length == 0;

    const getFormInputErrors = (formData) => {
        let errors = [];
        errors = errors.concat(getUsernameErrors(formData.username));
        errors = errors.concat(getEmailInputErrors(formData.email));
        errors = errors.concat(getPasswordErrors(formData.password, formData.password2));
        return errors;
    };

    // Collects all recognized errors in currently typed username and returns them as array of strings
    const getUsernameErrors = (username) => {
        let usernameErrors = [];

        // TODO: implement logic of legit username, e. g. accepted length, no special characters, etc...
        return usernameErrors;
    };

    // Collects all recognized errors in currently typed email and returns them as array of strings
    const getEmailInputErrors = (email) => {
        let emailErrors = [];

        // TODO: implement validation

        return emailErrors;
    };

    // Collects all recognized errors in current typed password and returns them in an array of strings
    const getPasswordErrors = (password, password2) => {
        let passwordErrors = []; // array of all recognized password errors
        // TODO: implement password checking, e. g. atleast 8 characters, upper- and lowercase only allowed characters, password matching!, ...

        return passwordErrors;
    };

