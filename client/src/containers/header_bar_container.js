import {
    connect
} from 'react-redux';
import {
    headerBarVisibilityFilters
} from '../constants/actionTypes';
import HeaderBar from '@/header_bar';


import {
    HOME_PATH,
    CREATE_POST_PATH,
    LOGIN_PATH,
    LOGOUT_PATH,
    REGISTER_PATH
} from '../paths';

// standard links that should be displayed all the time
let standardLinks = [{
        path: HOME_PATH,
        text: 'HOME'
    },
    {
        path: CREATE_POST_PATH,
        text: 'Create Post'
    }
];

// links that should only be displayed when user is authenticated
let authenticatedLinks = standardLinks.concat(
    [{
        path: LOGOUT_PATH,
        text: 'Logout'
    }]
);

// links that will only be displayed when user is not authenticated
let unauthenticatedLinks = standardLinks.concat([{
        path: LOGIN_PATH,
        text: 'Login'
    },
    {
        path: REGISTER_PATH,
        text: 'Register'
    }
]);

// unpack the attributes using array destructuring (ES6)
let {
    SHOW_AUTHENTICATED,
    SHOW_UNAUTHENTICATED
} = headerBarVisibilityFilters;

const getVisibleHeaderBarLinks = filter => {
    switch (filter) {
        case SHOW_AUTHENTICATED:
            return authenticatedLinks.slice(0);
        case SHOW_UNAUTHENTICATED:
            return unauthenticatedLinks.slice(0);
        default:
            return unauthenticatedLinks.slice(0);
    }
};

const mapStateToProps = state => {
    return {
        headerBarLinks: getVisibleHeaderBarLinks(state.headerBarVisibilityFilter)
    }
};

const HeaderBarContainer = connect(mapStateToProps)(HeaderBar);

export default HeaderBarContainer;
