import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql' // GraphQL and GraphQL types
import mongo from './database/mongo' // Database
import * as actions from './actions'
import * as types from './graphqlTypes'

//Defines all queries that can be done, and their details
const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Perform a query on the database using one of the following:',
    fields: () => ({
        posts: {
            type: new GraphQLList(types.PostType),
            args: {
                owner: {
                    type: GraphQLString
                }
            },
            resolve: (x, args) => {
                if (args.owner) {
                    return mongo.getPostsByOwner(args.owner)
                }
                return mongo.getPosts();
            }
        },
        post: {
            type: types.PostType,
            description: 'Get a specific post. Pass in post id as an argument.',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => {
                return mongo.getPost(args.id);
            }
        },
        tags: {
            type: new GraphQLList(types.TagType),
            description: 'Get a list of all tags that have been used',
            resolve: (x, args) => {
                return mongo.getTags();
            }
        },
        user: {
            type: types.UserType,
            description: 'Get User',
            args: {
                userId: {
                    type: GraphQLString
                }
            },
            resolve: (x, args) => {
                return mongo.getUserNameById(args.userId)
            }
        },
        comments: {
            type: new GraphQLList(types.CommentType),
            description: 'Get a list of comments for a specific post',
            args: {
                postId: {
                    type: GraphQLString
                },
                userId: {
                    type: GraphQLString
                }
            },
            resolve: (x, args) => {
                //check which argument is passed, and return appropriate method
                if (args.postId) {
                    mongo.getCommentsPost(args.postId).then(value => {
                        console.log(value);
                        return;
                    })
                    return mongo.getCommentsPost(args.postId);
                } else if (args.userId) {
                    mongo.getCommentsUser(args.postId).then(value => {
                        console.log(value);
                        return;
                    })
                    return mongo.getCommentsUser(args.userId);
                }
            }
        }
    })
});

const PostMutation = new GraphQLObjectType({
    name: 'PostMutations',
    description: 'Post API Mutations',
    fields: () => ({
        createPost: {
            type: types.PostType,
            description: 'Create a new post.',
            args: {
                post: {
                    type: types.PostInputType
                }
            },
            resolve: (root, {
                post
            }, context) => {
                if (context.req.user) {
                    let userId = context.req.user._id
                    return actions.createPost(userId, post)
                } else {
                    console.error('no auth')
                    throw new Error('you need to be authorized to create a post')
                }
            }
        },
        createComment: {
            type: types.CommentType,
            description: "Create a new comment on a post",
            args: {
                comment: {
                    type: types.CommentInputType
                }
            },
            resolve: (root, {
                comment
            }, context) => {
                //Get the user from the request
                var userId = context.req.user._id;
                //NOTE: For testing only
                //TODO: remove completely
                //var userId = "59be0a53336d4e22cca74840";

                /* HOW TO QUERY using Graphiql
                mutation CreateCommentForPost($comment: CommentAttributes!) {
                  createComment(comment: $comment) {
                    id
                    comment
                  }
                }
                *****query variables*****
                "comment": {
                  "postId": "599c47e39694f605c06dc5f",
                  "comment": "Comment text"
                }
                */
                return mongo.createComment(userId, comment.postId, comment.comment);
            }
        },
        updatePost: {
            type: types.PostType,
            description: 'Update an post, and optionally any related posts.',
            args: {
                post: {
                    type: types.PostInputType
                }
            },
            resolve: (root, {
                post
            }) => {
                console.log('resolve: ', post)
                return mongo.updatePost(post);
            }
        },
        deletePost: {
            type: types.PostType,
            description: 'Delete an post with id and return the post that was deleted.',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (value, {
                id
            }) => {
                return mongo.deletePost(id);
            }
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
    mutation: PostMutation
})