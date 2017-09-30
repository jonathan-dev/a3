import { connect } from 'react-redux';
import { postRegistration } from '../actions/actions';
import RegisterPage from '@/register_page'
// THIS FILE HAS NOT BEEN UPDATED ENTIRELY FOR REDUX USAGE TODO: implement container

    //Handles submission of register form TODO: NOT IMPLEMENTED YET, CORRECT IMPLEMENTATION
    const handleSubmit = (dispatch, event, formInputIsValid) => {
        event.preventDefault(); //Stops page refresh

        // extract formdata to object
        let formData = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            password2: event.target.password2.value, // don't send password2 to the server, trim object before request
        };

        if(formInputIsValid(formData)) {
            // trim to only relevant data for request
            let trimmedFormData = {
                username: formData.username,
                password: formData.password,
                email: formData.email
            };

            dispatch(postRegistration(trimmedFormData));
        } else {
            console.log("Form not valid!");
            // TODO: implement
        }
        console.log("Called register submit");
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

    const mapStateToProps = state => {
        return {
            // TODO implement
        }
    };

    const mapDispatchToProps = dispatch => {
        return {
            handleSubmit: (event) => handleSubmit(dispatch, event, formInputIsValid)
        }
    };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
