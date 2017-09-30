import React from 'react';
import axios from 'axios';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);
        props.check(props.match.params.id)
    }

    resetForm = () => {
        const {handleSubmit} = this.props
        console.log(handleSubmit)
        return (
            <div>
                <form onSubmit={e =>
                handleSubmit(e, this.props.match.params.id)}
                >
                    <label>
                        Password:
                        <input
                        name="password"
                        type="password"
                         />
                    </label>
                    <label>
                        Re-enter your password:
                        <input
                        name="password2"
                        type="password"
                         />
                    </label>
                    {this.props.passwordsMatch?'':<p>passwords not matching</p>}
                    <button type="submit">register</button>
                </form>
            </div>
        )
    }

    render() {
        const { routeIsValid } = this.props;
        return (
            <section>
                <h1>{this.props.match.params.id}</h1>
                {routeIsValid ?
                    this.resetForm() :
                    <h1>not valid</h1>}
            </section>
        );
    }
}

export default ResetPage;
