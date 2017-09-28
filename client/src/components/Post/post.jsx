import React, { Component } from 'react';
import './post.sass';
import Tag from '@/Tag/tag';
import languages from 'src/language/language';

let currentLanguage = "english"; // default, TODO: change when user changes his local language later on
export default class Post extends Component {
  render(){
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <p>11.11.2016</p>
        <p>{this.props.post.owner.username}</p>

        {
          <img src={
            this.props.post.imageId
              ?window.location.origin+"/images/"+this.props.post.imageId+".png"
              :window.location.origin+"/images/sanic_crop.png"
          }/>

        }
        <p>
          {this.props.post.voteup} {languages[currentLanguage]["upvotes"]}, {this.props.post.votedown} {languages[currentLanguage]["downvotes"]}
        </p>
        <div>
          {this.props.post.tags.map((tag, index) =>{
            return <Tag key={index} tag={tag} />
          })
        }
        </div>
      </div>
    );
  }
}

/**
 * TODO: replace date with dynamic data
 *
 * TODO: do proper error checking (for null/undefined)
 *
 * TODO: add proper placeholder img which is show when
 *       no image is found or the image is still loading
 *       maybe it would be nice to use an svg
 */
