import { connect } from 'react-redux';
import {
    gql,
    graphql,
} from 'react-apollo';
import HomePage from '../components/hot_page';
import { updatePostSearchBarInput,  clearSearchBarInput} from '../actions/actions';

const mapStateToProps = (state) => {
    return {
        visiblePostComments: state.postVisibility.visiblePostComments.slice(0),
        searchBarInput: state.postVisibility.
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchBarInputChange: event => dispatch(updatePostSearchBarInput(event.target.value)),
        clearPostSearch: () => dispatch(clearSearchBarInput())
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
