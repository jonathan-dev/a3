import React, { Component } from 'react';
import {
    Button,
    Col
} from 'react-bootstrap';

const Comment = props => {
    const {comment, date, owner } = props.comment;
    let d = new Date(date);
    let calendarDate = d.toLocaleDateString();
    let time = d.getHours() + ":" + d.getMinutes();
    let adjustedDate = time + " (" + calendarDate + ")";

    return (
        <section>
            <div className={"comment"}>
                <h2 className="author">{owner.username}</h2>
                { comment }
                { props.isOwnComment ? <Button className="pull-right" bsStyle="primary" bsSize="xsmall">Edit</Button> : null }
                <p>{adjustedDate}</p>
            </div>
        </section>
    );
};

export default Comment
