import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'; //links to user profile
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table'; //provides bootstrap table
import {
    Button,
    Col,
    Panel
} from 'react-bootstrap'; //provides rest of bootstrap styled stuff
//provides query ability



const AdminPage = props => {

    //check if actually admin
    if (!props.isAuthenticated) {
        return <Redirect to={"/login"} />;
    }

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    };

    const { myUsername, banUser } = props;
    const { loading, error, users } = props.data;

    const banButton = (cell, row) => {
        const { isLocked, id, username } = row;
        return (
            <Button block
                onClick={() => banUser(id, !isLocked)}>
                {(isLocked ? "Unban" : "Ban") + " " + username}
            </Button>)
    };

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }
    const filteredUsers = users.filter(u => u.username.localeCompare(myUsername));
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
