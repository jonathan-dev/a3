import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
// import { NavLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'; //link to tag page
import './tag.sass';

const Tag = props => {
    const { tag, index } = props;

    const margin10 = {
        margin: '10px',
    };

    return (
        <LinkContainer to={'/tag/'+tag.id} style={margin10}>
            {/* <div className="tag"> */}
                {/* <p className="tag_name"> */}
                    <Label bsStyle="info">{tag.name}</Label>
                {/* </p> */}
            {/* </div> */}
        </LinkContainer>
    );
};

export default Tag;
