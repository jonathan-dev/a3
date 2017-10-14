import { connect } from 'react-redux';
import {
    gql,
    graphql,
} from 'react-apollo';
import HomePage from '../components/hot_page';
import { showPostComments, hidePostComments } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    return {
        visiblePostComments: state.postVisibility.visiblePostComments.slice(0)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showPostComments: post => dispatch(showPostComments(post)),
        hidePostComments: post => dispatch(hidePostComments(post))
    }
};

//Query for retrieving a list of image posts
const postsListQuery = gql`
query postListQuery {
  posts {
    id
    title
    date
    owner {
        id
        username
    }
    imageId
    voteup
    votedown
    tags {
      id
      name
    }
  }
}
`;

export default graphql(postsListQuery)(
    connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
