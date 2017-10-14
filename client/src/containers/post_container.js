import { connect } from 'react-redux';
import Post from '../components/post';
import { showPostComments, hidePostComments } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    return {
        post: ownProps.post,
        showComments: ownProps.showComments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPostComments: post => dispatch(showPostComments(post)),
        hidePostComments: post => dispatch(hidePostComments(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
