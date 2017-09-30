import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from '../paths';

class RegisterPage extends Component {
    //Render HTML register form
    render() {
        let registrationErrors;
        // if logged in redirect to home TODO: check if works properly with saving stuff to local storage
        if (this.props.isAuthenticated)
            return <Redirect to={HOME_PATH}/>;

        if (this.props.registrationErrors) {
            registrationErrors = this.props.registrationErrors.map((error, index) => <li key={index}>{error}</li>);
        }

        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text"/>
                    </label>

                    <label>
                        Email address:
                        <input name="email" type="text"/>
                    </label>

                    <label>
                        Password:
                        <input name="password" type="password"/>
                    </label>

                    <label>
                        Re-enter your password:
                        <input name="password2" type="password"/>
                    </label>
                    <button type="submit">register</button>
                </form>

                <ul>
                    {registrationErrors}
                </ul>
            </div>
        );
    }
}

export default RegisterPage;
