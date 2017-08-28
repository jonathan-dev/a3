import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider
} from 'react-apollo';
import React, { Component } from 'react';
import {render} from 'react-dom'

const client = new ApolloClient();

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

//Returns populated HTML for the list using fed in data
const PostsList = ({ data: {loading, error, posts}}) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>
    { posts.map( post => 
      <li key={post.id}>
        {post.title}
        <img src={post.imagePath} />
        <p>
          {post.voteup} upvotes, {post.votedown} downvotes
        </p>
      </li>) 
    }
  </ul>;
};

//
const PostsListWithData = graphql(postsListQuery)(PostsList);

//Top level function to insert 
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PostsListWithData/>
      </ApolloProvider>
    );
  }
}

//Renders the results of the app function into the 'app' tag in the current HTML document
render(
  <App/>,
  document.getElementById('app')
);
