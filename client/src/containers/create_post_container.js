import React from 'react'
import {
    connect
} from 'react-redux';
import createPost from '../components/create_post'
import {
    requestPasswordReset
} from '../actions/actions';
import {
    push
} from 'react-router-redux';
import { gql, graphql } from 'react-apollo';

const PostMutations = gql`
mutation PostMutations($post: PostInput!) {
  createPost(post: $post) {
    title
  }
}
`;

const TagsQuery = gql`
query tagListQuery {
  tags {
    id
    name
  }
}
`;

const handleSubmit = (dispatch, event, token) => {
    event.preventDefault();

    console.log('---request reset')
    const email = event.target.email.value;
    dispatch(requestPasswordReset(email));
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (event) => handleSubmit(dispatch, event),
    }
};

export default graphql(PostMutations)(
    graphql(TagsQuery)(connect(mapStateToProps, mapDispatchToProps)(createPost)));

