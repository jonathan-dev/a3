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
          this.props.post.imageId?
            <img src={window.location.origin+"/images/"+this.props.post.imageId+".png"} />
          :""

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
