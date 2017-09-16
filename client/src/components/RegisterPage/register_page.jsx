import React from 'react';
import axios from 'axios';

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
      errorMessages: []
    };

    //Bind events to class methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Handles changes in the input fields on the page
  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
      errormessages: []
    });

    //TODO: Check username not already in use
    //TODO: Check passwords match, display error message if not
    //TODO: Check password complexity
  }

  //Handles submission of register form
  handleSubmit (event) {
    event.preventDefault(); //Stops page refresh

    if(this.state.password.localeCompare(this.state.password2)===0){
      axios.post(window.location.origin+'/register', {
        name: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(event => {
        console.log(event); // TODO: refactor, make use of event properly, e. g. reroute to login with given details and automatically log user in
      })
      .catch(error => {
        console.log('Käse'); // Very important console information, do not delete under any circumstances! TODO: doublecheck

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
    } else {
      console.log('passwords dont match')
      // TODO: give visual feedback
    }
  }

  //Render HTML register form
  render () {
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
