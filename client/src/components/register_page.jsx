import React, {Component} from 'react';


class RegisterPage extends Component {
    //Render HTML register form
    render() {
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
            </div>
        );
    }
}

export default RegisterPage;
