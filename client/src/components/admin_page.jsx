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
                <BootstrapTable data={ users } striped={true}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="left" dataSort={true}>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="username" dataSort={true}>Username</TableHeaderColumn>
                    {/* {
                        users.map(user => {
                            return <Post key={post.id} post={post} />
                            })
                    } */}
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
  }
}
`;

export default graphql(usersListQuery, {
    options: { pollInterval: 2000 },
})(AdminPage);
