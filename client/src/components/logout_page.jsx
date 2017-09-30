import React, { Component } from 'react';

class LogoutPage extends Component {
    constructor(props) {
        super (props);
        this.props.logout();
    }

    render() {
        return (
            <p>dings</p>
        );
    }
}

export default LogoutPage;
