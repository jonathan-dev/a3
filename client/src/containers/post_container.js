import { connect } from 'react-redux';
import Post from '../components/post';
import { showPostComments, hidePostComments } from '../actions/actions';

const a = (post, dispatch) => {
    console.log("Showing post comments: ", post);
    dispatch(showPostComments(post));
};

const b = (post, dispatch) => {
    console.log("Hiding post comments: ", post);
    dispatch(hidePostComments(post));
};

const mapStateToProps = (state, ownProps) => {
    return {
        post: ownProps.post,
        showComments: ownProps.showComments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPostComments: post => a(post, dispatch),
        hidePostComments: post => b(post, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
