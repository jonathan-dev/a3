import { connect } from 'react-redux';
import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import Post from './post';





const mapStateToProps = (state, ownProps) => {
    return {

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
};

//Query for retrieving a list of image posts
const postsListQuery = gql`
query postListQuery {
  posts {
    id
    title
    date
    owner {
        id
        username
    }
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

export default graphql(postsListQuery)(HotPage);
