import React from 'react';
import CommentBox from '../containers/comment_box_container';

import { Panel, Label, Button } from 'react-bootstrap';

const Post = props => {


    const margin10 = {
        margin: '10px',
    };

    const margin20 = {
        margin: '20px',
    };

    const { post, showComments } = props;
    const { showPostComments, hidePostComments } = props;

    console.log("POST COMPONENT HERE; post is: ", post);

    let actionButton;
    if (showComments) {
        actionButton =
            <Button bsStyle="primary" bsSize="small" onClick={() => hidePostComments(post)}>
                hide comments
            </Button>;
    }
    else {
        actionButton =
            <Button bsStyle="primary" bsSize="small" onClick={() => showPostComments(post)}>
                show comments
            </Button>
    }

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
/**
 * TODO: create container
 *
 * TODO: do proper error checking (for null/undefined)
 *
 * TODO: add proper placeholder img which is show when
 *       no image is found or the image is still loading
 *       maybe it would be nice to use an svg
 */
