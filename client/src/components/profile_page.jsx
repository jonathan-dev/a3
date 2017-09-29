import {
    gql,
    graphql,
} from 'react-apollo';
import React, { Component } from 'react';
import Post from '@/post';


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.data && this.props.data.loading) {
            return <div>Loading</div>
        }
        if (this.props.data && this.props.data.error) {
            return <div>Error</div>
        }

        const posts = this.props.data.posts;
        const username = this.props.data.user.username;
        return (
            <div>
                <h1>{username}</h1>
                {posts.map(post => {
                    return <Post key={post.id} post={post} />
                })}
            </div>
        )
    }
}

const postsListQuery = gql`
query postListQuery ($owner: String) {
  posts(owner: $owner) {
    id
    title
    owner {
        id
        username
    }
    imageId
    voteup
    votedown
    tags {
      id
      name
    }
  }
  user(userId: $owner){
    id
    username
  }
}
`;

export default graphql(postsListQuery, {
    options: (props) => ({
        variables: {
            owner: props.match.params.id
        }
    })
})(ProfilePage);
