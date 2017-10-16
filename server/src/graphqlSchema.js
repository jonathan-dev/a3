/**
 * Defines all possible graphql requests with details,
 * and how to perform/resolve each request.
 */
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql' // GraphQL and GraphQL types
import mongo from './database/mongo' // Database
import * as actions from './actions'
import * as types from './graphqlTypes' //Graphql data types

//Defines all queries that can be done via GraphQL.
const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Perform a query on the database using one of the following:',
    fields: () => ({

        posts: {
            type: new GraphQLList(types.PostType),
            description: 'Get a list of posts',
            args: {
                owner: {
                    type: GraphQLString,
                    description: 'Filter by the owner of the post'
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

        users: {
            type: new GraphQLList(types.UserType),
            description: 'Get a list of all users in database',
            resolve: (root, args, context) => {
                //Retrieves the 'isAdmin' flag from context, decoded by passport
                if (context.req.user.isAdmin) {
                    return mongo.getUsers();
                } else {
                    throw new Error('you need to be an admin to view this page');
                }
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
                    mongo.getCommentsPost(args.postId);
                    return mongo.getCommentsPost(args.postId);
                } else if (args.userId) {
                    mongo.getCommentsUser(args.postId);
                    return mongo.getCommentsUser(args.userId);
                }
            }
        }
    })
});

//Defines all mutations (changes) in graphql
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
                    let userId = context.req.user.id
                    return actions.createPost(userId, post)
                } else {
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
                const userId = context.req.user.id;
                return mongo.createComment(userId, comment.postId, comment.comment);
            }
        },
        updateComment: {
            type: types.CommentType,
            description: "Update an existing comment",
            args: {
                comment: {
                    type: new GraphQLNonNull(types.CommentInputType)
                }
            },
            resolve: (root, {comment}, context) => {
                return mongo.updateComment(comment,context.req.user.id);
            }
        },
        deleteComment: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Delete an existing comment",
            args: {
                commentId: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, {commentId}, context) => {
                return mongo.deleteComment(commentId)
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
            resolve: (root, {post}) => {
                return mongo.updatePost(post);
            }
        },

        banUser: {
            type: types.UserType,
            description: 'Ban or unban a user (prevents from logging in)',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The user id to ban'
                },
                banned: {
                    type: GraphQLBoolean,
                    description: 'Whether the user is banned or not. Defaults to false (unban) if not specified'
                }
            },
            resolve: (value, {id, banned }, context) => {
                //Check if banning current user
                if (id == context.req.user.id) {
                    throw new Error("you can't ban yourself");
                } else {
                    //Checks if user is an admin
                    if (context.req.user.isAdmin) {
                        // Performs ban or unban
                        return (banned ?  mongo.banUser(id) : mongo.unbanUser(id));
                    } else {
                        throw new Error('you need to be an admin to perform this action');
                    }
                }
            }
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
    mutation: PostMutation
})
