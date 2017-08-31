import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider
} from 'react-apollo';
import React, { Component } from 'react';
import {render} from 'react-dom'

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
    // return <Post post={posts[]} />
    return (
      <div>
        {posts.map(post =>{
          console.log(post)
          return <Post post={post} />
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
    imagePath
    voteup
    votedown
  }
}
`;

export default graphql(postsListQuery)(HotPage);
