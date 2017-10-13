import {
    gql,
    graphql,
} from 'react-apollo';
import React, { Component } from 'react';
import Post from './post';
import ErrorPage from './error_page';

const TagPage = props => {

    const colCentered = {
        float: 'none',
        margin: '0 auto',
    }

    const { data } = props;


    if (data) {
        const { loading, error, posts, tag } = data;

        //const posts = this.props.data.posts;


        if (loading) {
            return <div>Loading</div>
        }
        if (error) {
            return <ErrorPage error={error}/>
        }

        return (
            <section className="col-lg-4" style={colCentered}>
                <h3> all posts tagged with </h3>
                <h1>{tag.name}</h1>
                <br/>
                {posts.map(post => {
                    return <Post key={post.id} post={post} />
                })}
            </section>
        )
    }
}

const postsListQuery = gql`
query postListQuery ($tagId: String!) {
  posts(tag: $tagId) {
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
  tag(id: $tagId){
    id
    name
  }
}
`;

export default graphql(postsListQuery, {
    options: (props) => ({
        variables: {
            tagId: props.match.params.tagid
        }
    })
})(TagPage);
