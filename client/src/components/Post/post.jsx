import React, { Component } from 'react';
import './post.sass';
import Tag from '@/Tag/tag';
export default class Post extends Component {
  render(){
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <p>11.11.2016</p>
        <img src="http://localhost:8000/images/sanic_crop.png" />
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
