import React, { Component } from 'react';
import CreateComment from './create_comment'

const Comment = props => {
    const {comment, date, owner } = props.comment;
    return (
        <section>
            <p>{owner.username+": "+ comment}</p>
            {props.isOwnComment ? <p>This is your comment</p> : null}
            <p>{date}</p>
        </section>
    );
};

export default Comment
