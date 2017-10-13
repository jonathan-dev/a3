import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import PromoteButton from '../components/admin_buttons';

const handlePromoteSubmit = (event, userId, mutate) => {
    event.preventDefault();
    mutate({
        variables: {
            userid: userId
        },
        refetchQueries: [{ query: usersListQuery }]
    }).then(({ data }) => {
        console.log('promote request submitted');
    }).catch((error) => {
        console.log('there was an error sending the query', error);
    });
}

//Redux function - maps current state to props object so it can be given to the component to render the page
const mapStateToProps = (state, props) => {
    return {
        //State properties that component may need
        isAuthenticated: state.authentication.isAuthenticated,
        isAdmin: state.authentication.isAdmin
    };
}

// redux function to map dispatch functions to props to invoke callback in admin page component from props
// note: this is how actions are dispatched as a result of interaction on the view components
// then the connect function links up the dispatching to here
const mapDispatchToProps = (dispatch, props) => {
    return {
        // handles banning or unbanning of users & other actions
        handlePromoteSubmit: event => handlePromoteSubmit(event, props.userId, props.promoteUserMutation),
        //switchCommentToEditMode: comment => dispatch(editCommentClicked(comment)),
    }
}

//Mutation request for promoting a user
const promoteUserGraphql = gql`
    mutation promoteUserMutation($userid: String!) {
        promoteUser(id: $userid) {
            username
            isAdmin
        }
    }
`;

//Query for retrieving a list of users
const usersListQuery = gql`
query userListQuery {
  users {
    id
    username
    isAdmin
    lockUntil
    isLocked
  }
}
`;

//Connect redux functionality in this page to the UI file in components
const PromoteButtonContainer = connect(mapStateToProps, mapDispatchToProps)(PromoteButton);

export default graphql(promoteUserGraphql, { name: 'promoteUserMutation' })(PromoteButton);
