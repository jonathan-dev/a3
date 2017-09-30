import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from "../paths";

class LoginPage extends Component {
    render() {
        // if already logged in, reroute to home
        if (this.props.isAuthenticated)
            return <Redirect to={HOME_PATH}/>;

        return (
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
        );
    }
}

export default LoginPage;
