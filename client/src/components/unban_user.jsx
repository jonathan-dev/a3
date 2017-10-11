import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class unbanUser extends Component {
    constructor() {
        super();
        this.state = {
            // comment: ''
        };
    }

    // handleChange = (event) => {
    //     console.log(event.target)
    //     this.setState({ comment: event.target.value });
    // }

    unbanUser = (e) => {
        e.preventDefault();
        this.props.mutate({
            variables: {
                comment: {
                    comment: this.state.comment,
                    postId: this.props.post
                }
            },
            refetchQueries: [{ query: commentListQuery, variables: { postId: this.props.post } }]
        })
            .then(({ data }) => {
                this.setState({ comment: '' });
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    }


}

export function unbanUserMutation(userid) {
    //Submit unban to server
    props.mutate({
        variables: {
            userid: userid
        },
        refetchQueries: [{ query: usersListQuery }]
    }).then(({ data }) => {
        console.log('got data, user unbanned', data);
    }).catch((error) => {
        console.log('there was an error sending the query', error);
    });
}

const UnbanUserMutation = gql`
    mutation unbanSpecificUser($userid: String!) {
        unbanUser(id: $userid) {
            username
            lockUntil
        }
    }
`;

export default graphql(UnbanUserMutation)(unbanUser);
