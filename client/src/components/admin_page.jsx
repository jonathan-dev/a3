/**
 * This file contains the visual representation of the admin page. All necessary state information and
 * functionality get passed to this page by the admin page container. This site only renders the props passed
 * and invokes callbacks also passed in the props, once a button is clicked.
 * */

import React from 'react';
import { Redirect } from 'react-router';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table'; //provides bootstrap table
import { Button } from 'react-bootstrap'; //provides rest of bootstrap styled stuff
import {LOGIN_PATH} from '../constants/paths' // provides static route paths for redirection



const AdminPage = props => {

    // check if actually admin
    if (!props.isAuthenticated) {
        return <Redirect to={LOGIN_PATH} />;
    }

    // section style as used below
    const colCentered = {
        float: 'none',
        margin: '0 auto',
    };

    // extract the necessary variables and callbacks from the props object
    const { myUsername, banUser } = props;
    const { loading, error, users } = props.data;

    // visual representation of the ban button, will render ban or unban depending on the users banning state
    const banButton = (cell, row) => {
        const { isLocked, id, username } = row;
        return (
            <Button block
                onClick={() => banUser(id, !isLocked)}>
                {(isLocked ? "Unban" : "Ban") + " " + username}
            </Button>)
    };

    // if the fetched data has not arrived yet render loading
    if (loading) {
        return <div>Loading</div>;
    }

    // if the server returned an error display it to the user
    if (error) {
        return <div>Error</div>;
    }

    // filter the users to display according to the search bar
    const filteredUsers = users.filter(u => u.username.localeCompare(myUsername));

    // return the html representation for rendering
    return (
        <section className="col-lg-8" style={colCentered}>
            <BootstrapTable data={filteredUsers}
                striped={true}
                search={true}
                hover={true}>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" dataSort={true}>User ID</TableHeaderColumn>
                <TableHeaderColumn dataField="username" dataSort={true}>Username</TableHeaderColumn>
                <TableHeaderColumn dataField="isAdmin" dataSort={true}>Administrator</TableHeaderColumn>
                <TableHeaderColumn dataField="isLocked" dataSort={true}>User account locked</TableHeaderColumn>
                <TableHeaderColumn dataField="lockUntil" dataSort={true}>Locked until</TableHeaderColumn>
                <TableHeaderColumn dataField="button" dataFormat={banButton}>Ban user</TableHeaderColumn>
            </BootstrapTable>
        </section>
    )
};

export default AdminPage;
