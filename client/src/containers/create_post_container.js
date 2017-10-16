/**
 * Logic for create_post page
 */

import { connect } from 'react-redux';
import createPost from '../components/create_post_page'
import {
    uploadImage,
    updateTags,
    updateAccepted,
    updateImage,
    resetState
} from '../actions/create_posts_actions';
import {
    gql,
    graphql
} from 'react-apollo';
import { reduxForm } from 'redux-form'

// define GraphQl mutation to upload a Post
const PostMutations = gql `
mutation PostMutations($post: PostInput!) {
  createPost(post: $post) {
    title
  }
}
`;

// define GraphQl query to get list of all tags for auto suggestions
const TagsQuery = gql `
query tagListQuery {
  tags {
    id
    name
  }
}
`;

/**
 * Handle the submission of the post
 * fire the graphql mutation
 * @param {*} event
 * @param {*} stateProps
 * @param {*} dispatchProps
 * @param {*} ownProps
 */
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
    };

    ownProps.mutate(mutationData)
        .then(() => {
            ownProps.history.push('/')
        })
        .catch((error) => {
            console.log('there was an error sending the query', error);
        });
};

/**
 * Handle file selection
 * trigger upload and display selected image
 * @param {*} dispatch
 * @param {*} accepted
 * @param {*} rejected
 */
const onDropHandler = (dispatch, accepted, rejected) => {
    if (accepted) {
        let formData = new FormData();
        formData.append("index", 1);
        formData.append("image", accepted[0]);
        dispatch(updateImage(accepted[0]));
        dispatch(uploadImage(dispatch, formData));
    }
}

/**
 * update selected tags in redux store
 * @param {*} dispatch
 * @param {*} tags
 */
const onUpdateTags = (dispatch, tags) => {
    dispatch(updateTags(tags))
}

/**
 * validation function for redux form
 * @param {*} values
 */
const validate = values => {
    const errors = {};
    const requiredFields = [
        'title',
        'image'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors
};

/**
 * Grab needed props from redux store
 * @param {*} state
 */
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        progress: state.createPost.uploadProgress,
        tags: state.createPost.tags ? state.createPost.tags.slice(0) : [],
        imageId: state.createPost.imageId,
        image: state.createPost.image,
    }
};

/**
 * map functions to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
    return {
        onDropHandler: (accepted, rejected) => onDropHandler(dispatch, accepted, rejected),
        onUpdateTags: (tags) => onUpdateTags(dispatch, tags),
        resetState: () => dispatch(resetState())
    }
};

/**
 * merge stateProps and dispatchProps
 * @param {*} stateProps
 * @param {*} dispatchProps
 * @param {*} ownProps
 */
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {
        handleSubmit: (event) => handleSubmit(event, stateProps, dispatchProps, ownProps)
    })
};

// wrap createPost Component with reduxFrom
const createPostForm = reduxForm({
    form: 'createPostForm', // a unique identifier for this form
    validate,
})(createPost);

export default
graphql(PostMutations)(
    graphql(TagsQuery)(
        connect(mapStateToProps, mapDispatchToProps, mergeProps)(createPostForm)
    )
);
