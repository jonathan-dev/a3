import React, { Component } from 'react';
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
import {
    gql,
    graphql,
} from 'react-apollo'; //provides query ability

const AdminPage = props => {

    //set up local variables from the props object
    const { data } = props;

    //check if actually admin
    if (props.isAuthenticated)
        return <Redirect to={HOME_PATH} />;


    //return actual page details

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    };

    if (data) {
        const { loading, error, users } = data;

        if (loading) {
            return <div>Loading</div>
        }
        if (error) {
            return <div>Error</div>
        }

        return (
            <section className="col-lg-8" style={colCentered}>
                <BootstrapTable data={ users } striped={true} search={true} hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" dataSort={true}>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="username" dataSort={true}>Username</TableHeaderColumn>
                    <TableHeaderColumn dataField="isAdmin" dataSort={true}>Administrator</TableHeaderColumn>
                    {/* <TableHeaderColumn
                        dataField="isAdmin"
                        dataSort={true}
                        editable={ { type: 'checkbox', options: { values: 'Y:N' } } }> Is administrator </TableHeaderColumn> */}
                    <TableHeaderColumn dataField="bannedUntil" dataSort={true}>Banned until</TableHeaderColumn>
                </BootstrapTable>
            </section>
        )
    };

}

const userToken = localStorage.getItem("token");

//Query for retrieving a list of users
//need to somehow get the token into here as an argument
const usersListQuery = gql`
query userListQuery {
  users {
    id
    username
    isAdmin
  }
}
`;

export default graphql(usersListQuery, {
    options: { pollInterval: 2000 },
})(AdminPage);
