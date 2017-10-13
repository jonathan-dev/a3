import {
    gql,
    graphql,
} from 'react-apollo';
import React, { Component } from 'react';
import Post from './post';
import ErrorPage from './error_page';

const colCentered = {
    float: 'none',
    margin: '0 auto',
}

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
            return <ErrorPage error={error}/>
        }

        const posts = this.props.data.posts;
        const username = this.props.data.user.username;
        return (
            <div>
                <section className="col-lg-4" style={colCentered}>
                    <h3> all posts by </h3>
                    <h1>{username}</h1>
                    <br/>
                    {posts.map(post => {
                        return <Post key={post.id} post={post} />
                    })}
                </section>
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
