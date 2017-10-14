import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Comment from '../components/comment';


const mapStateToProps = (state, ownProps) => {
    return {
        comment: ownProps.comment,
        isOwnComment: state.authentication.username === ownProps.comment.owner.username
    }
};

export default connect(mapStateToProps)(Comment)
