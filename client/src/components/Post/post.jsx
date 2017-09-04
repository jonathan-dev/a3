import React, { Component } from 'react';
import './post.sass';
import Tag from '@/Tag/tag';
export default class Post extends Component {
  render(){
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <p>11.11.2016</p>
        {
          <img src={
            this.props.post.imageId
              ?window.location.origin+"/images/"+this.props.post.imageId+".png"
              :window.location.origin+"/images/sanic_crop.png"
          }/>

        }
        <div>
          {this.props.post.tags.map(tag =>{
            return <Tag key={tag.id} tag={tag} />
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
