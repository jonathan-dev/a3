import {
    ApolloClient,
    gql,
    graphql,
    ApolloProvider
} from 'react-apollo';
import React, { Component } from 'react';
import {render} from 'react-dom'

const client = new ApolloClient();

//Simple CSS to style the top bar
var topBarStyle = {
  color:'white',
  backgroundColor:'black',
  fontWeight:'bold',
  fontFamily:'arial, helvetica, sans-serif',
  padding:'1em',
  whiteSpace:'nowrap',
  width:'100%'
}

//Simple CSS to style tag list
var listStyle = {
  listStyle:'none',
  listStyleType:'none',
  overflow:'auto'
};

//Simple CSS to style each tag item
var tagStyle = {
  color:'black',
  backgroundColor:'white',
  display:'inline',
  padding:'1em',
  margin:'1em',
  border:'1px solid #000;',
  textTransform:'capitalize'
};

//Query for retrieving a list all tags in the tags 'table'
const tagsListQuery = gql`
   query tagsListQuery {
     tags {
       id
       name
     }
   }
 `;

//Returns populated HTML for the list using fed in data
const TagsList = ({ data: {loading, error, tags}}) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <div style={topBarStyle}>
    <ul style={listStyle}>
      { tags.map( tag =>
        <li key={tag.id} class="tag" style={tagStyle}>
          {tag.name}
        </li>)
      }
    </ul>
  </div>;
};

//Allows tag to be called to pipe query into tagslist function
const TagsListWithData = graphql(tagsListQuery)(TagsList);

//Top level function to insert
class TopBar extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <TagsListWithData/>
      </ApolloProvider>
    );
  }
}

//Inserts the TopBar rendering function into the 'top_bar' tag in the current HTML document
render(
  <TopBar/>,
  document.getElementById('top_bar')
);
