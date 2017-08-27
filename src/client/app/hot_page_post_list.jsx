import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider
} from 'react-apollo';
import React, { Component } from 'react';
import {render} from 'react-dom'

const client = new ApolloClient();

const postsListQuery = gql`
   query postListQuesty {
     posts {
       id
       title
       imagePath
     }
   }
 `;

const PostsList = ({ data: {loading, error, posts}}) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>
    { posts.map( post => <li key={post.id}>{post.title}<img src={post.imagePath} /></li>) }
  </ul>;
};

const PostsListWithData = graphql(postsListQuery)(PostsList);


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PostsListWithData/>
      </ApolloProvider>
    );
  }
}


render(
  <App/>,
  document.getElementById('app')
);
