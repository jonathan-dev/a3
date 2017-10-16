/**
 * This component handels the visual representation of a post. All necessary information will be passed down to this
 * page in form of props variables, including callbacks by it's corresponding container and wrappers.
 * */

import React from 'react';
import CommentBox from '../containers/comment_box_container';
import { Panel, Label, Button } from 'react-bootstrap';

const Post = props => {

    // style objects for rendering
    const margin10 = {
        margin: '10px',
    };

    const margin20 = {
        margin: '20px',
    };

    // extract the handed variables from the props
    const { post, showComments } = props;
    const { showPostComments, hidePostComments } = props;

    // if show comments have been activated, action button beneath a post will be hide comments
    let actionButton;
    if (showComments) {
        actionButton =
            <Button bsStyle="primary" bsSize="small" onClick={() => hidePostComments(post)}>
                hide comments
            </Button>;
    }
    // else it will be a show comments button
    else {
        actionButton =
            <Button bsStyle="primary" bsSize="small" onClick={() => showPostComments(post)}>
                show comments
            </Button>
    }

    // return the rendering for this site
    return (
        <Panel>
            <h3>{post.title}</h3>
            <p>{post.date}</p>
            <p>{post.owner.username}</p>
            {
                <img src={
                    post.imageId
                        ? window.location.origin + "/images/" + post.imageId + ".png"
                        : window.location.origin + "/images/sanic_crop.png"
                } width={"100%"} />

            }
            <section style={margin20}>
                {post.tags.map((tag, index) => {
                        return <Label bsStyle="info" key={index} style={margin10} >{tag.name}</Label>
                    })
                }
            </section>
            { actionButton }
            { showComments ? <CommentBox postId={post.id} /> : null }
        </Panel>
    );
};

export default Post;
