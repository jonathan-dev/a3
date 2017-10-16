/**
 * Defines a tag & styling, used to display a single tag on a post
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tag.sass'
export default class Tag extends Component {
    render(){
        return (
            <div className="tag">
                <p className="tag_name">{this.props.tag?this.props.tag.name:'unknown'}</p>
            </div>
        );
    }
}
