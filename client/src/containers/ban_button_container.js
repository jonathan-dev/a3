import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import BanButton from '../components/admin_buttons';

const handleBanSubmit = (event, userId, isLocked, mutate) => {
    event.preventDefault();
    //Performs opposite ban action of whatever current user ban status is
    mutate({
        variables: {
            userId: userId,
            userBanned: !isLocked
        },
        refetchQueries: [{ query: usersListQuery }]
    }).then(({ data }) => {
        console.log('got data, user ban changed ', data);
    }).catch((error) => {
        console.log('there was an error sending the query', error);
    });
};

//Redux function - maps current state to props object so it can be given to the component to render the page
const mapStateToProps = (state, props) => {

    return {
        //Properties that the component needs to render
        isAuthenticated: state.authentication.isAuthenticated,
        isAdmin: state.authentication.isAdmin
    };
}

// redux function to map dispatch functions to props to invoke callback in admin page component from props
// note: this is how actions are dispatched as a result of interaction on the view components
// then the connect function links up the dispatching to here
const mapDispatchToProps = (dispatch, props) => {
    console.log('Props recievede in map dispatch method, userid: ', props.userId);
    return {
        // handles banning or unbanning of users & other actions
        handleBanSubmit: event => handleBanSubmit(event, props.userId, props.isLocked, props.banUserMutation),
        //switchCommentToEditMode: comment => dispatch(editCommentClicked(comment)),
    }
}

//Mutation request for banning / unbanning a user
const banUserGraphql = gql`
    mutation changeBanStatus($userId: String!, $userBanned: Boolean!) {
        banUser(id: $userId, banned: $userBanned) {
            username
            lockUntil
            isLocked
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
export default graphql(banUserGraphql, { name: 'banUserMutation' })(connect(mapStateToProps, mapDispatchToProps)(BanButton));
