import React, { Component } from 'react';
import CreateComment from '@/CreateComment/create_comment'

class Comment extends Component {
    constructor() {
        super();
    }

    render() {
        const {comment, date} = this.props.comment
        return (
            <section>
                <p>{comment}</p>
                <p>{date}</p>
            </section>
        );
    }
}

export default Comment
