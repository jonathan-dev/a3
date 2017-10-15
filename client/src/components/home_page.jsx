import React from 'react';
import Post from '../containers/post_container';
import {
    Form,
    Button,
    ButtonGroup,
    FormControl,
    Col
} from 'react-bootstrap';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.refetch();
    }

    componentWillUnmount () {
        this.props.clearPostSearch();
    }

    render () {
        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        const { data, visiblePostComments } = this.props;
        const { onSearchBarInputChange, clearPostSearch, searchBarInput } = this.props;

        if (data) {
            const { loading, error, posts } = data;

            if (loading) {
                return <div>Loading</div>;
            }

            if (error) {
                return <div>Error</div>;
            }

            const filteredPosts = posts.filter(post => {
                let postTitle = post.title.toLowerCase();
                let searchBarLowered = searchBarInput.toLowerCase();

                return postTitle.indexOf(searchBarLowered) !== -1;
            });

            const postList = filteredPosts.map((post, index) => {
                const showPostComments = visiblePostComments.filter(p => p.id === post.id).length !== 0;
                return <Post key={index} post={post} showComments={showPostComments}/>
            });

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
}

export default HomePage;
