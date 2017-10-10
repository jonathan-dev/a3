/**
 * Container for the admin page. This file handles all logic behind the admin page.
 * Logic includes: Displaying all users. Allowing users to be blocked / enabled / promoted.
 *      Filtering / searching list of users.
 *
 */

//component import
import { connect } from 'react-redux';
import AdminPage from '../components/admin_page';

//Redux function - maps current state to props object so it can be given to the component to render the page
const mapStateToProps = state => {
    return {
        //Properties that the component needs to render
        isAuthenticated: state.authentication.isAuthenticated,
        isAdmin: state.authentication.isAdmin
    };
}

// redux function to map dispatch functions to props to invoke callback in admin page component from props
// note: this is how actions are dispatched as a result of interaction on the view components
// then the connect function links up the dispatching to here
const mapDispatchToProps = dispatch => {
    return {
        // handles banning or unbanning of users & other actions

    }
}

//Connect redux functionality in this page to the UI file in components
const AdminPageContainer = connect(mapStateToProps, mapDispatchToProps)(AdminPage);

export default AdminPageContainer;
