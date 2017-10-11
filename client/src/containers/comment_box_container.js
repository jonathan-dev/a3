import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';

const handleCommentSubmit = (event, postId, mutate) => {
    event.preventDefault();
    let comment = event.target.comment.value;

    mutate({
        variables: {
            comment: {
                comment: comment,
                postId: postId
            }
        },
        refetchQueries: [{ query: commentListQuery, variables: { postId: postId } }]
    })
    .then(({ data }) => {
        console.log('got data', data)
    })
    .catch(err => console.log("Error sending comment quAry", err));
};

const handleEditComment = () => {
    console.log("Edit comment was clicked");
};

const handleDeleteComment = () => {
    console.log("Delete comment was clicked");
};

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.authentication.username
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleCommentSubmit: event => handleCommentSubmit(event, ownProps.postId, ownProps.newCommentMutation),
        handleEditComment: () => handleEditComment(),
        handleDeleteComment: () => handleDeleteComment()
    }
};

const commentListQuery = gql`
    query commentListQuery($postId: String) {
        comments (postId: $postId){
            id
            comment
            owner {
                id
                username
            }
            date
        }
    }
`;

const createComment = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            comment
        }
}`;

const updateComment = gql`
    mutation updateComment($comment: CommentInput!) {
        updateComment(comment: $comment) {
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

export default graphql(createComment, {name: 'newCommentMutation'})(
    graphql(commentListQuery)(
        connect(mapStateToProps, mapDispatchToProps)
        (CommentBox)
    )
)
