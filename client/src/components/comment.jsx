import React from 'react';

const Comment = props => {
    const {comment, date, owner} = props.comment;
    let d = new Date(date);
    let calendarDate = d.toLocaleDateString();
    let time = d.getHours() + ":" + d.getMinutes();
    let adjustedDate = time + calendarDate;
    return (
        <div>
            <h2 className="author">{owner.username}</h2>
            <h6>Posted on { adjustedDate}</h6>
            { comment }
        </div>
    );
};

export default Comment;
