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
    constructor (props) {
        super (props);
    }

    onComponentWillUnmount () {
        this.props.clearPostSearch();
    }

    render () {
        const colCentered = {
            float: 'none',
            margin: '0 auto',
        };

        const { data, visiblePostComments } = this.props;

        if (data) {
            const { loading, error, posts } = data;

            if (loading) {
                return <div>Loading</div>
            }

            if (error) {
                return <div>Error</div>
            }

            const postList = posts.map((post, index) => {
                const showPostComments = visiblePostComments.filter(p => p.id === post.id).length !== 0;
                return <Post key={index} post={post} showComments={showPostComments}/>
            });

            const { onSearchBarInputChange } = this.props;
            console.log("Käse: ", this.props)

            return (
                <section className="col-lg-4" style={colCentered}>
                    <div style={{marginBottom: "50px"}}>
                        <FormControl type="text" placeholder="Search for titles or tags" onChange={onSearchBarInputChange}/>
                        <Button className="pull-right" style={{marginTop: "5px"}} bsStyle="primary" bsSize="small">Clear</Button>
                    </div>
                    { postList }
                </section>
            )
        }
    }
}

export default HomePage;
