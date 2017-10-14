import { connect } from 'react-redux';
import Post from '../components/post';
import { showPostComments, hidePostComments } from '../actions/actions';

const a = (post, dispatch) => {
    dispatch(showPostComments(post));
};

const b = (post, dispatch) => {
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
