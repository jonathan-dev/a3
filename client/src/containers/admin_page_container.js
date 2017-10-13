/**
 * Container for the admin page. This file handles all logic behind the admin page.
 * Logic includes: Displaying all users. Allowing users to be blocked / enabled / promoted.
 *      Filtering / searching list of users.
 *
 */

//component import
import { connect } from 'react-redux';
import {
    gql,
    graphql
} from 'react-apollo';
import AdminPage from '../components/admin_page';

const handleBanSubmit = (event, userId, isBanned, mutate) => {
    console.log('Handlebansubmit event info: ', event )
    event.preventDefault();
    banUserMutation({
        variables: {
            userid: userid,
            userBanned: isBanned
        },
        refetchQueries: [{ query: usersListQuery }]
    }).then(({ data }) => {
        console.log('got data, user ban changed ', data);
    }).catch((error) => {
        console.log('there was an error sending the query', error);
    });
};

const handlePromoteSubmit = (event, userId, mutate) => {
    //Send a mutation request to server
    event.preventDefault();
    props.promoteUserMutation({
        variables: {
            userid: userid
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
        //Properties that the component needs to render
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
        handleBanSubmit: event => handleBanSubmit(event, props.userId, props.isBanned, props.banUserMutation),
        //switchCommentToEditMode: comment => dispatch(editCommentClicked(comment)),
    }
}

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

//Mutation request for banning / unbanning a user
const banUserGraphql = gql`
    mutation changeBanStatus($userid: String!, $userBanned: Boolean!) {
        banUser(id: $userid, banned: $userBanned) {
            username
            lockUntil
            isLocked
        }
    }
`;

//Mutation request for promoting a user
const promoteUserGraphql = gql`
    mutation promoteUserMutation($userid: String!) {
        promoteUser(id: $userid) {
            username
            isAdmin
        }
    }
`;

//Connect redux functionality in this page to the UI file in components
const AdminPageContainer = connect(mapStateToProps, mapDispatchToProps)(AdminPage);

export default
    graphql(banUserGraphql, { name: 'banUserMutation' })(
        graphql(promoteUserGraphql, { name: 'promoteUserMutation' }) (
            graphql(usersListQuery, { options: { pollInterval: 2000 },})
                (AdminPage)
        )
);
