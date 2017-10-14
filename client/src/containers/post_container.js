import { connect } from 'react-redux';
import Post from '../components/post';
import { showPostComments, hidePostComments } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const visiblePostCommentsList = state.postVisibility.visiblePostComments.slice(0);
    const showComments = visiblePostCommentsList.filter(post => post.id === ownProps.post.id).length === 0;

    return {
        post: ownProps.post,
        showComments: showComments
    };
};

const mapDispatchToProps = (state, ownProps) => {
    return {
        showPostComments: post => dispatch(showPostComments(post)),
        hidePostComments: post => dispatch(hidePostComments(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
