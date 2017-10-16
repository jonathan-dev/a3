/**
 * This file contains the visual representation of the home page of the application with the list of posts posted
 * by this or other users. All necessary state information alongside functionality in form of callbacks can be
 * accessed by the props which where passed by the corresponding container class.
 * */

import React from 'react';
import Post from '../containers/post_container';
import {
    Button,
    FormControl
} from 'react-bootstrap';

class HomePage extends React.Component {

    componentDidMount() {
        // once you load the site, update the post list by refetching the post list query
        this.props.refetch();
    }

    componentWillUnmount () {
        // when you leave the site, clear the search bar
        this.props.clearPostSearch();
    }

    render () {
        // style object needed for rendering as used below
        const colCentered = {
            float: 'none',
            margin: '0 auto'
        };

        // extract all needed data passed to this component from the props
        const { data, visiblePostComments } = this.props;
        const { onSearchBarInputChange, clearPostSearch, searchBarInput } = this.props;

        // extract the graphql variables from the fetched query
        const { loading, error, posts } = data;

        // if data has not arrived yet, render loading
        if (loading) {
            return <div>Loading</div>;
        }

        // if the server responded with an error, render error
        if (error) {
            return <div>Error</div>;
        }

        // filter the post to suit the search bar input if the user has entered some input in the search post bar
        const filteredPosts = posts.filter(post => {
            // trimm the post title to be not case sensitive
            let postTitle = post.title.toLowerCase();
            let searchBarLowered = searchBarInput.toLowerCase();

            // if the search string can be found inside the title string return true, else false
            return postTitle.indexOf(searchBarLowered) !== -1;
        });

        // wrap the filtered posts up for rendering
        const postList = filteredPosts.map((post, index) => {
            // compute it the user wants to display the comments of the post
            const showPostComments = visiblePostComments.filter(p => p.id === post.id).length !== 0;
            return <Post key={index} post={post} showComments={showPostComments}/>
        });

        // return the rendered data for displaying
        return (
            <section className="col-lg-4" style={colCentered}>
                <div style={{marginBottom: "50px"}}>
                    <FormControl
                        type="text"
                        placeholder="Search for titles"
                        value={searchBarInput}
                        onChange={onSearchBarInputChange}
                    />
                    <Button
                        className="pull-right"
                        style={{marginTop: "5px"}}
                        bsStyle="primary"
                        bsSize="small"
                        onClick={clearPostSearch}
                    >
                        Clear
                    </Button>
                </div>
                { postList }
            </section>
        )
    }
}

export default HomePage;
