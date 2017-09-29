import React from 'react';
import axios from 'axios';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password1: '',
            password2: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // TODO: change
        axios.post(window.location.origin + '/reset', {
            name: this.state.email,
        })
            .then(event => console.log(event))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <h1>{this.props.match.params.id}</h1>
        );
    }
}

export default ResetPage;
