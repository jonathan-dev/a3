import { connect } from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';

const mapStateToProps = (state, ownProps) => {

};

const mapDispatchToProps = (state, ownProps) => {

};

export const commentListQuery = gql`
    query commentListQuery($postId: String) {
        comments (postId: $postId){
            id
            comment
            owner {
                id
                username
            }
            voteup
            votedown
        }
    }
`;

const createPost = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
        comment
    }
}`;

const updatePost = gql`
    mutation updateComment($id: CommentInput!) {
        createComment(comment: $comment) {
        comment
        }
    }
`;

const CommentMutations = gql`
mutation CommentMutations($comment: CommentInput!) {
    createComment(comment: $comment) {
    comment
    }
}
`;

const CommentBoxWithMutations = graphql()

export default graphql(CommentMutations)(graphql(commentListQuery)(connect(mapStateToProps, mapDispatchToProps)(CommentBox)));
