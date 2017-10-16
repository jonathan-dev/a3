/**
 * This is the root app component which combines the HeaderBar with the currently selected sites in the routes.
 * */

import React, { Component } from 'react';
import HeaderBar from '../containers/header_bar_container';
import Routes from '../routes';

class App extends Component {
    render () {
        return(
            <div>
                <HeaderBar/>
                <Routes/>
            </div>
        );
    }
}

export default App;
