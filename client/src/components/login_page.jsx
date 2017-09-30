import React, {Component} from 'react';

// TODO: make code clean
class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
