import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Panel } from 'react-bootstrap';

const colCentered = {
        float: 'none',
        margin: '0 auto',
    };

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="col-lg-8" style={colCentered}>
                <h1>Error</h1>
                <h3> Sorry, something went wrong.</h3>
                {<p> Error details: { this.props.error.message.toString() } </p>}
            </section>
        )
    }
}

export default ErrorPage;
