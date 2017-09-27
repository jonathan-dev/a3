import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import {gql} from "react-apollo";
 /*
//Query for an individual post
const postQuery = gql`
  query postQuery {

  }
`;

//Query for retrieving comments related to the post
const commentsQuery = gql`
  query postQuery {

  }
`;*/

class PostDetailsPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    // TODO: implement actual page
    return (
      <h1>Im the Post details page!</h1>
    );
  }

}

export default PostDetailsPage;
