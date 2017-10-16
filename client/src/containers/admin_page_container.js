/**
 * Container for the admin page. This file handles all logic behind the admin page.
 * Logic includes: Own user data and callbacks for banning / unbanning users
 */

import { connect } from 'react-redux';
import AdminPage from '../components/admin_page';
import {
    gql,
    graphql
} from 'react-apollo';


const banUser = (userId, isBanned, ownProps) => {
    //Send a mutation request to server, the mutation name is defined in the graphql wrapper on the bottom of the file
    ownProps.banUserMutation({
        variables: {
            userid: userId,
            userBanned: isBanned
        },
        // update the users list by refetching the data after successfully sending the mutation
        refetchQueries: [{ query: usersListQuery }]
    }).catch(error => {
        console.log('there was an error sending the query', error);
    });
};

// Redux function - maps current state to props object so it can be given to the component to render the page
const mapStateToProps = state => {
    return {
        //Properties that the component needs to render
        isAuthenticated: state.authentication.isAuthenticated,
        isAdmin: state.authentication.isAdmin,
        myUsername: state.authentication.username
    };
};

// redux function to map dispatch functions to props to invoke callback in admin page component from props
// note: this is how actions are dispatched as a result of interaction on the view components
// then the connect function links up the dispatching to here
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // handles banning or unbanning of users & other actions
        banUser: (userId, isBanned) => banUser(userId, isBanned, ownProps)
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

export default
graphql(banUserGraphql, { name: 'banUserMutation' })(
        graphql(usersListQuery, { options: { pollInterval: 2000 }})
            (connect(mapStateToProps, mapDispatchToProps)(AdminPage)));
