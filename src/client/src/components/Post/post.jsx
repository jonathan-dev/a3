import React, { Component } from 'react';
import './post.sass';
import Tag from '@/Tag/tag';
export default class Post extends Component {
  render(){
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <p>11.11.2016</p>
        <img src="/kangaroo.jpg" />
        <div>
          {this.props.post.tags.map(tag =>{
            return <Tag tag={tag} />
          })}
        </div>
      </div>
    );
  }
}
