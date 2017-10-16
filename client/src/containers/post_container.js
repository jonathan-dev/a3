/**
 * Redux container for post object
 * */
import { connect } from 'react-redux';
import Post from '../components/post';
import { showPostComments, hidePostComments } from '../actions/actions';

/**
 * Redux method to provide post with post details
 * and whether or not to display comments for this post
 */
const mapStateToProps = (state, ownProps) => {
    return {
        post: ownProps.post,
        showComments: ownProps.showComments
    };
};

/**
 * Redux method to provide post with method callbacks
 * for showing and hiding post comments for that post
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showPostComments: post => dispatch(showPostComments(post)),
        hidePostComments: post => dispatch(hidePostComments(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
