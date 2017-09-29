import React from 'react';
import axios from 'axios';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);
        props.check(props.match.params.id)
    }

    render() {
        const {routeIsValid} = this.props;
        return (
            <section>
            <h1>{this.props.match.params.id}</h1>
            {routeIsValid?
                <h1>valid</h1>:
                <h1>not valid</h1>}
            </section>
        );
    }
}

export default ResetPage;
