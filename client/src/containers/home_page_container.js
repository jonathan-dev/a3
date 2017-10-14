import { connect } from 'react-redux';
import {
    gql,
    graphql,
} from 'react-apollo';
import HomePage from '../components/hot_page';
import { showPostComments, hidePostComments } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    console.log("HAHAH: ", state.postVisibility.visiblePostComments);
    return {
        visiblePostComments: state.postVisibility.visiblePostComments.slice(0)
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
    connect(mapStateToProps)(HomePage)
);
