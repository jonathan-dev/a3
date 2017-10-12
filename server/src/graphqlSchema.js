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
                    mongo.getCommentsPost(args.postId).then(value => {
                        return;
                    })
                    return mongo.getCommentsPost(args.postId);
                } else if (args.userId) {
                    mongo.getCommentsUser(args.postId).then(value => {
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

        voteAction: {
            type: types.PostType,
            description: 'Vote action',
            args: {
                voteInput: {
                    type: types.VoteInputType
                }
            },
            resolve: (root, {
                voteInput
            }, context) => {
                console.log('---vote---')
                return mongo.vote(voteInput, context.req.user);
            }
        },

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
                return mongo.updateComment(comment);
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
                        return (banned ?  mongo.banUser(id) : mongo.unbanUser(id))
                    } else {
                        throw new Error('you need to be an admin to perform this action');
                    }
                }
            }
        },
        promoteUser: {
            type: types.UserType,
            description: 'Promote a user to admin status',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The user id to promote'
                }
            },
            resolve: (value, {id}, context) => {
                if (context.req.user.isAdmin) {
                    //Performs promotion
                    return mongo.promoteUser(id);
                } else {
                    throw new Error('you need to be an admin to perform this action.');
                }
            }
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
    mutation: PostMutation
})
