import {connect} from 'react-redux'
import {
    gql,
    graphql
} from 'react-apollo';
import CommentBox from '../components/comment_box';
import { editCommentClicked, undoEditCommentClicked } from '../actions/actions';

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

const handleCommentUpdate = (comment) => {
    console.log("Updating comments not implemented yet");

};

const handleDeleteComment = (comment, postId, mutate) => {
    mutate({
        variables: {
            commentId: comment.id
        },
        refetchQueries: [{ query: commentListQuery, variables: { postId: postId } }]
    })
    .then(({data}) => {
        console.log("Deleted comment", data);
    })
    .catch(err => console.log("Error deleting comment: ", err));
};

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.authentication.username,
        commentInEditMode: state.commenting.editCommentWithId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleCommentSubmit: event => handleCommentSubmit(event, ownProps.postId, ownProps.newCommentMutation),
        switchCommentToEditMode: comment => dispatch(editCommentClicked(comment)),
        undoEditMode: comment => dispatch(undoEditCommentClicked(comment)),
        handleCommentUpdate: comment => handleCommentUpdate(comment), // TODO: REFACTOR
        handleDeleteComment: comment => handleDeleteComment(comment, ownProps.postId, ownProps.newCommentDeletionMutation)
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

const updateComment = gql`
    mutation updateComment($comment: Comment!) {
        updateComment(comment: $comment) {
            comment
        }
    }
`;

const createComment = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            comment
        }
}`;


const deleteComment = gql`
    mutation deleteComment($commentId: String!) {
        deleteComment(commentId: $commentId)
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
    graphql(deleteComment, {name: 'newCommentDeletionMutation'})(
        graphql(updateComment, {name: 'newCommentUpdateMutation'})(
            graphql(commentListQuery)(
                connect(mapStateToProps, mapDispatchToProps)
                (CommentBox)
            )
        )
    )
)
