import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class RegisterPage extends React.Component {

  //Prepare class
  constructor (props) {
    super(props);

    //Set up state variable with all necessary fields
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errorMessages: [],
      registrationAccomplished: false
    };

    //Bind events to class methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formInputIsValid = this.formInputIsValid.bind(this);
    this.usernameIsValid = this.usernameIsValid.bind(this);
    this.getUsernameErrors = this.getUsernameErrors.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.getEmailInputErrors = this.getEmailInputErrors.bind(this);
    this.passwordIsValid = this.passwordIsValid.bind(this);
    this.getPasswordErrors = this.getPasswordErrors.bind(this);
  }

  //Handles changes in the input fields on the page
  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    let errors = [];

    errors.concat(this.getUsernameErrors(), this.getEmailInputErrors(), this.getPasswordErrors());

    this.setState({
      [name]: value,
      errormessages: errors.slice(0)
    });
  }

  //Handles submission of register form
  handleSubmit (event) {
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
  }

  // checks whether all input is correct and valid for submission
  formInputIsValid () {
    return this.usernameIsValid() && this.passwordIsValid() && this.emailIsValid();
  }

  // Checks if username is allowed
  usernameIsValid () {
    return this.getUsernameErrors().length == 0;
  }

  // Collects all recognized errors in currently typed username and returns them as array of strings
  getUsernameErrors () {
    let usernameErrors = [];

    // TODO: implement logic of legit username, e. g. accepted length, no special characters, etc...
    return usernameErrors;
  }

  // Checks whether the currently typed email is accepted
  emailIsValid () {
    return this.getEmailInputErrors().length == 0;
  }

  // Collects all recognized errors in currently typed email and returns them as array of strings
  getEmailInputErrors () {
    let emailErrors = [];

    // TODO: implement validation

    return emailErrors;
  }

  // Method will check whether current typed password is accepted
  passwordIsValid () {
    return this.getPasswordErrors().length == 0;
  }

  // Collects all recognized errors in current typed password and returns them in an array of strings
  getPasswordErrors () {
    let passwordErrors = []; // array of all recognized password errors
    // TODO: implement password checking, e. g. atleast 8 characters, upper- and lowercase only allowed characters, password matching!, ...

    return passwordErrors;
  }

  //Render HTML register form
  render () {
    if (this.state.redirectToReferrer) {
      return (
        <Redirect to='/'/>
      )
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          </label>

          <label>
            Email address:
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </label>

          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>

          <label>
            Re-enter your password:
            <input name="password2" type="password" value={this.state.password2} onChange={this.handleChange} />
          </label>
          <button type="submit">register</button>
        </form>

        <ul>{this.state.errorMessages}</ul>
      </div>
    );
  }
}

export default RegisterPage;
