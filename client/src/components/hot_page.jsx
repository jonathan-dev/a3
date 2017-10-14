import React from 'react';
import Post from './post';
import { Button } from 'react-bootstrap';

const HotPage = props => {

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    };

    const { data, visiblePostComments, showPostComments, hidePostComments } = props;

    if (data) {
        const { loading, error, posts } = data;

        if (loading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div>Error</div>
        }

        const postList = posts.map((post, index) => {
            let actionButton;
            const showPostComments = visiblePostComments.filter(p => p.id = post.id).length === 0;

            if (showPostComments) {
                actionButton =
                <Button bsStyle="primary" bsSize="small" onClick={(post) => hidePostComments(post)}>
                    hide comments
                </Button>;
            }
            else {
                actionButton =
                <Button bsStyle="primary" bsSize="small" onClick={(post) => showPostComments(post)}>
                    show comments
                </Button>
            }

            return (
                <div key={index}>
                    <Post post={post} showComments={showPostComments}/>
                    { actionButton }
                </div>
            );

        });

        return (
            <section className="col-lg-4" style={colCentered}>
                { postList }
            </section>
        )
    }
};

export default HotPage;
