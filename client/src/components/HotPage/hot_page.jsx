import {
  gql,
  graphql,
} from 'react-apollo';
import React, { Component } from 'react';

import Post from '@/Post/post';

class HotPage extends Component {

  render(){
    if(this.props.data && this.props.data.loading){
      return <div>Loading</div>
    }
    if(this.props.data && this.props.data.error){
      return <div>Error</div>
    }

    const posts = this.props.data.posts;
    return (
      <div>
        {posts.map(post =>{
          return <Post key={post.id} post={post} />
        })}
      </div>
    )
  }
}

//Query for retrieving a list of image posts
const postsListQuery = gql`
query postListQuery {
  posts {
    id
    title
    imageId
    voteup
    votedown
    tags {
      id
      name
    }
  }
}
`;

export default graphql(postsListQuery,{
  options: { pollInterval: 2000 },
})(HotPage);
