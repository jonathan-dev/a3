import React, { Component } from 'react';
import Tag from './tag';
import CommentBox from './comment_box';
import languages from 'src/language/language';

import { Panel, Label } from 'react-bootstrap';


let currentLanguage = "english"; // default, TODO: change when user changes his local language later on
const Post = props => {

    const margin10 = {
        margin: '10px',
    };

    const margin20 = {
        margin: '20px',
    };

    const { post } = props;

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
            <p>
                {post.voteup} {languages[currentLanguage]["upvotes"]}, {post.votedown} {languages[currentLanguage]["downvotes"]}
            </p>
            <section style={margin20}>
                {post.tags.map((tag, index) => {
                    return <Label bsStyle="info" key={index} style={margin10} >{tag.name}</Label>
                })
                }
            </section>
            <CommentBox post={post.id} />
        </Panel>
    );
}

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
