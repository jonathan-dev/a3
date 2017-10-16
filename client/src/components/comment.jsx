/**
 * This file handles the visual representation of a comment. All necessary data will get passed to this component
 * by the comment container.
 * */

import React from 'react';

const Comment = props => {
    // extract the variables passed by the props.comment
    const {comment, date, owner} = props.comment;

    // reformat the date for trimmed representation
    let d = new Date(date);
    let adjustedDate = d.getHours() + ":" + d.getMinutes() + " " + d.toLocaleDateString();

    return (
        <div>
            <h2 className="author">{owner.username}</h2>
            <h6>Posted on { adjustedDate}</h6>
            { comment }
        </div>
    );
};

export default Comment;
