import React from 'react';
import Post from '../containers/post_container';

const HotPage = props => {

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    };

    const { data, visiblePostComments } = props;

    if (data) {
        const { loading, error, posts } = data;

        if (loading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div>Error</div>
        }

        const postList = posts.map((post, index) => {
            const showPostComments = visiblePostComments.filter(p => p.id === post.id).length !== 0;
            return <Post key={index} post={post} showComments={showPostComments}/>
        });

        return (
            <section className="col-lg-4" style={colCentered}>
                { postList }
            </section>
        )
    }
};

export default HotPage;
