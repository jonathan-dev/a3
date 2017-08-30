import React, { Component } from 'react';
import './tag.sass'
export default class Post extends Component {
    render(){
        return (
            <div className="tag">
                <p className="tag_name">{this.props.tagName}</p>
            </div>
        );
    }
}