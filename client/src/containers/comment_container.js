import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Comment from '../components/comment';


const mapStateToProps = (state, ownProps) => {
    console.log("OWN OPP: ", ownProps);
    return {
        comment: ownProps.comment,
        isOwnComment: state.authentication.username === ownProps.comment.owner.username
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // TODO: implement dispatch to props mapping
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Comment)
