import React, {Component} from 'react';

// TODO: make code clean
class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let formData = {
            username: this.props.username,
            password: this.props.password
        };

        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Username:
                    <input name="username" type="text" value={this.props.username}
                           onChange={this.props.onInputChanged}/>
                </label>

                <label>
                    Password:
                    <input name="password" type="password" value={this.props.password}
                           onChange={this.props.onInputChanged}/>
                </label>

                <input type="submit" value="submit"/>
            </form>
        );
    }
}

export default LoginPage;
