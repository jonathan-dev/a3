import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from "../paths";

class LoginPage extends Component {
    componentDidMount () {
        this.props.clearLoginErrors();
    }

    render() {
        let loginErrors;

        // if already logged in, reroute to home
        if (this.props.isAuthenticated)
            return <Redirect to={HOME_PATH}/>;

        // if there are loginErrors, map them for rendering
        if (this.props.loginErrors) {
            loginErrors = this.props.loginErrors.map((error, index) => <li key={index}>{error}</li>);
        }

        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text"/>
                    </label>

                    <label>
                        Password:
                        <input name="password" type="password"/>
                    </label>
                    <input type="submit" value="submit"/>
                </form>

                <ul>
                    {loginErrors}
                </ul>
            </div>
        );
    }
}

export default LoginPage;
