import React from 'react'
import { connect } from 'react-redux';
import createPost from '../components/create_post_page'
import {
    uploadImage,
    updateTags,
    updateAccepted,
    updateImage,
    resetState
} from '../actions/create_posts_actions';
import { push } from 'react-router-redux';
import {
    gql,
    graphql
} from 'react-apollo';
import { reduxForm } from 'redux-form'

const PostMutations = gql `
mutation PostMutations($post: PostInput!) {
  createPost(post: $post) {
    title
  }
}
`;

const TagsQuery = gql `
query tagListQuery {
  tags {
    id
    name
  }
}
`;

const handleSubmit = (event, stateProps, dispatchProps, ownProps) => {

    event.preventDefault();

    const title = event.target.title.value || '';

    const mutationData = {
        variables: {
            post: {
                title: title,
                imageId: stateProps.imageId,
                tags: stateProps.tags ||[]
            }
        }
    }

    ownProps.mutate(mutationData)
        .then(({
            data
        }) => {
            console.log('got data', data);
            ownProps.history.push('/')
        }).catch((error) => {
            console.log('there was an error sending the query', error);
        });
};

const onDropHandler = (dispatch, accepted, rejected) => {
    if (accepted) {
        let formData = new FormData();
        formData.append("index", 1);
        formData.append("image", accepted[0]);
        dispatch(updateImage(accepted[0]));
        dispatch(uploadImage(dispatch, formData));
    }
}

const onUpdateTags = (dispatch, tags) => {
    dispatch(updateTags(tags))
}

const validate = values => {
    const errors = {}
    const requiredFields = [
        'title',
        'image'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        progress: state.createPost.uploadProgress,
        tags: state.createPost.tags ? state.createPost.tags.slice(0) : null,
        imageId: state.createPost.imageId,
        image: state.createPost.image
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDropHandler: (accepted, rejected) => onDropHandler(dispatch, accepted, rejected),
        onUpdateTags: (tags) => onUpdateTags(dispatch, tags),
        resetState: () => dispatch(resetState())
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {
        handleSubmit: (event) => handleSubmit(event, stateProps, dispatchProps, ownProps)
    })
}

const createPostForm = reduxForm({
    form: 'createPostForm', // a unique identifier for this form
    validate,
})(createPost)

export default
graphql(PostMutations)(
    graphql(TagsQuery)(
        connect(mapStateToProps, mapDispatchToProps, mergeProps)(createPostForm)
    )
);
