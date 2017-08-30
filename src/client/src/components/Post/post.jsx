import React, { Component } from 'react';

export default class Post extends Component {
    render(){
        return (
            <div>
                <h3>Post Title</h3>
                <p>{new Date().getUTCDate}</p>
            </div>
        );
    }
}