import React, { Component } from 'react';
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
    graphql
} from 'react-apollo'; //provides query ability
import BanButton from '../containers/ban_button_container';
import ErrorPage from './error_page';

const AdminPage = props => {

    //set up local variables from the props object
    const { data, handleBanSubmit } = props;

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
            return <ErrorPage error={error}/>
        }

        function promoteButton(cell, row, enumObject, rowIndex) {
            return  (!row.isAdmin && !row.isLocked ) ? (
                //Promote user to admin button
                <Button
                    onClick={() =>
                        promoteUser(row.id)}
                    block>
                    Promote { row.username }
                </Button>
            ) : (
                //Disabled promote button, user already admin
                <Button
                    onClick={() =>
                        promoteUser(row.id)}
                    block
                    disabled>
                    Promote { row.username }
                </Button>
            )
        }
        //random change

        function localBanButton(cell, row, enumObject, rowIndex) {
            //Populate button container with props
            console.log('Props to pass in, user id: ', row.id)
            return (
                <BanButton
                    username={row.username}
                    userId={row.id}
                    isLocked={row.isLocked}/>
            );
        }

        return (
            <section className="col-lg-8" style={colCentered}>
                <BootstrapTable data={ users }
                    striped={true}
                    search={true}
                    hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" dataSort={true}>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="username" dataSort={true}>Username</TableHeaderColumn>
                    <TableHeaderColumn dataField="isAdmin" dataSort={true}>Administrator</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={ promoteButton }>Promote to admin</TableHeaderColumn>
                    <TableHeaderColumn dataField="isLocked" dataSort={true}>User account locked</TableHeaderColumn>
                    <TableHeaderColumn dataField="lockUntil" dataSort={true}>Locked until</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={ localBanButton }>

                    </TableHeaderColumn>
                </BootstrapTable>
            </section>
        )
    };

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

//Export all graphql requests for use by apollo
export default
    graphql(banUserGraphql, { name: 'banUserMutation' })(
    graphql(promoteUserGraphql, { name: 'promoteUserMutation' }) (
    graphql(usersListQuery, { options: { pollInterval: 2000 },})
    (AdminPage)));

//export default graphql(UserMutations)(AdminPage);
