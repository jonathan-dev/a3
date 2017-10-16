import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Comment from '../components/comment';

/**
 * set isOwnComment to true if the logged in user created the comment
 * pass comment through
 */
const mapStateToProps = (state, ownProps) => {
    return {
        comment: ownProps.comment,
        isOwnComment: state.authentication.username === ownProps.comment.owner.username
    }
};

export default connect(mapStateToProps)(Comment)
