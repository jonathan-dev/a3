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

        //Cell editing mode for react bootstrap table
        // const cellEdit = {
        //     mode: 'click' // click cell to edit
        // };

        function banUserMutation(userid, isBanned) {
            //Send a mutation request to server
            props.mutate({
                variables: {
                    userid: userid,
                    userBanned: isBanned
                },
                refetchQueries: [{ query: usersListQuery }]
            }).then(({ data }) => {
                console.log('got data, user banned', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
        }

        function banButton(cell, row, enumObject, rowIndex) {
            return  (!row.isLocked ) ? (
                //Ban button
                <Button
                    onClick={() =>
                        banUserMutation(row.id, true)}
                    block>
                    Ban { row.username }
                </Button>
            ) : (
                //User unban button
                <Button
                    onClick={() =>
                        banUserMutation(row.id, false)}
                    block>
                    Unban { row.username }
                </Button>
            )
        }

        if (loading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div>Error</div>
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
                    {/* <TableHeaderColumn
                        dataField="isAdmin"
                        dataSort={true}
                        editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>
                        Is administrator
                    </TableHeaderColumn> */}
                    <TableHeaderColumn dataField="isLocked" dataSort={true}>User account locked</TableHeaderColumn>
                    <TableHeaderColumn dataField="lockUntil" dataSort={true}>Locked until</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={ banButton }>Ban user</TableHeaderColumn>
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

const BanUserMutations = gql`
    mutation changeBanStatus($userid: String!, $userBanned: Boolean!) {
        banUser(id: $userid, banned: $userBanned) {
            username
            lockUntil
        }
    }
`;

export default graphql(BanUserMutations)(graphql(usersListQuery, {
    options: { pollInterval: 2000 },
})(AdminPage));

//export default graphql(UserMutations)(AdminPage);
