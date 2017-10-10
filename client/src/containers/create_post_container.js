import React from 'react'
import {
    connect
} from 'react-redux';
import createPost from '../components/create_post'
import {
    uploadImage,
    updateTags
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

const handleSubmit = (dispatch, props, event,) => {
    props.mutate({
        variables: { post: { title: this.state.title, imageId: this.state.imageId, tags: this.state.tags } }
    })
        .then(({ data }) => {
            console.log('got data', data);
            this.props.history.push('/')
        }).catch((error) => {
            console.log('there was an error sending the query', error);
        });
};

const onDropHandler = (dispatch, accepted, rejected) => {
    if (accepted) {
        let formData = new FormData();
        formData.append("index", 1);
        formData.append("image", accepted[0]);
        dispatch(uploadImage(dispatch, formData))
    }
}

const onUpdateTags = (dispatch, tags) => {
    dispatch(updateTags(tags))
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        progress: state.createPost.uploadProgress,
        tags: state.createPost.tags ? state.createPost.tags.slice(0) : null,
        imageId: state.createPost.imageId,
        title: state.createPost.title,

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: (event) => handleSubmit(dispatch, props, event),
        onDropHandler: (accepted, rejected) => onDropHandler(dispatch, accepted, rejected)
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({},ownProps, stateProps, {
        handleSubmit: () => dispatchProps.handleSubmit()
    }
    )
}

export default
graphql(PostMutations)(
    graphql(TagsQuery)(
        connect(mapStateToProps, mapDispatchToProps)(createPost)
    )
);
