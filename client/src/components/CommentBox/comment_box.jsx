import React, { Component } from 'react';
import CreateComment from '@/CreateComment/create_comment'

class CommentBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section>
                <CreateComment post={this.props.post}/>
            </section>
        );
    }
}

export default CommentBox
