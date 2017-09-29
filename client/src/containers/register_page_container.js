import { connect } from 'react-redux';

// THIS FILE HAS NOT BEEN UPDATED ENTIRELY FOR REDUX USAGE TODO: implement container

    //Handles changes in the input fields on the page
    const handleChange = (event, getUsernameErrors, getEmailInputErrors, getPasswordErrors) => {
        const name = event.target.name;
        const value = event.target.value;
        let errors = [];
        errors.concat(getUsernameErrors(), getEmailInputErrors(), getPasswordErrors());
    };

    //Handles submission of register form
    const handleSubmit = (event) => {
        event.preventDefault(); //Stops page refresh

        if(this.formInputIsValid()) {
            axios.post(window.location.origin+'/register', {
                name: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
                .then(event => {
                    console.log(event); // TODO: refactor, make use of event properly, e. g. reroute to login with given details and automatically login
                    console.log("You have successfully created a user");
                    this.setState({
                        redirectToReferrer: true
                    })
                })
                .catch(error => {
                    console.log('Käse'); // Very important console information, do not delete under any circumstances! TODO: doublecheck
                    console.log(error);
                    // error messages returned as array in response body, see /register route for further details
                    let errorMessagesStrings = error.response.data.slice(0);

                    // will contain the error messages wrapped in <li> tags for rendering
                    let errorMessagesList = [];

                    // push every error message in the new array, wrapped with <li> tags and specified with a unique key
                    errorMessagesStrings.forEach((errorMessage, index) => {
                        errorMessagesList.push(<li key={index}>{errorMessage}</li>);
                    });

                    // update the state, so that the error messages list gets rerendered
                    this.setState({
                        errorMessages: errorMessagesList.slice(0)
                    });
                });
        }
    };

    // checks whether all input is correct and valid for submission
    const formInputIsValid = () => getFormInputErrors().length == 0;

    const getFormInputErrors = () => {
        let errors = [];
        errors = errors.concat(getUsernameErrors());
        errors = errors.concat(getEmailInputErrors());
        errors = errors.concat(getPasswordErrors());
        return errors;
    };

    // Collects all recognized errors in currently typed username and returns them as array of strings
    const getUsernameErrors = () => {
        let usernameErrors = [];

        // TODO: implement logic of legit username, e. g. accepted length, no special characters, etc...
        return usernameErrors;
    };

    // Collects all recognized errors in currently typed email and returns them as array of strings
    const getEmailInputErrors = () => {
        let emailErrors = [];

        // TODO: implement validation

        return emailErrors;
    };

    // Collects all recognized errors in current typed password and returns them in an array of strings
    const getPasswordErrors = () => {
        let passwordErrors = []; // array of all recognized password errors
        // TODO: implement password checking, e. g. atleast 8 characters, upper- and lowercase only allowed characters, password matching!, ...

        return passwordErrors;
    };

