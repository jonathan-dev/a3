import {
    gql,
    graphql,
} from 'react-apollo';
import React, { Component } from 'react';

import Post from '@/post';

class HotPage extends Component {

    render() {
        const {data} = this.props;
        if(data){
            const {loading, error, posts} = data;

            if (loading) {
                return <div>Loading</div>
            }
            if (error) {
                return <div>Error</div>
            }

            return (
                <section>
                    {posts.map(post => {
                        return <Post key={post.id} post={post} />
                    })}
                </section>
            )
        }
    }
}

//Query for retrieving a list of image posts
const postsListQuery = gql`
query postListQuery {
  posts {
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
}
`;

export default graphql(postsListQuery, {
    options: { pollInterval: 2000 },
})(HotPage);
