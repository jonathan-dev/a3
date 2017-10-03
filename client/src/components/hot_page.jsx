import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import Post from '@/post';

const HotPage = props => {

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    const { data } = props;
    
    if (data) {
        const { loading, error, posts } = data;

        if (loading) {
            return <div>Loading</div>
        }
        if (error) {
            return <div>Error</div>
        }

        return (
            <section className="col-lg-4" style={colCentered}>
                {posts.map(post => {
                    return <Post key={post.id} post={post} />
                })}
            </section>
        )
    }
}

//Query for retrieving a list of image posts
const postsListQuery = gql`
query postListQuery {
  posts {
    id
    title
    date
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
