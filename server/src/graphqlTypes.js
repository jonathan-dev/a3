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

export const TagType = new GraphQLObjectType({
    name: 'Tag',
    description: 'is used to sort post into Categories',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (tag) => tag._id
        },
        name: {
            type: GraphQLString,
            resolve: (tag) => tag.name
        }
    })
})

export const TagAttributesInputType = new GraphQLInputObjectType({
    name: 'TagAttributes',
    fields: () => ({
        id: {
            type: GraphQLString
        }
    })
})

export const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post that is displayed in the feed',

    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (post) => post._id
        },
        imageId: {
            type: GraphQLString,
            resolve: (post) => post.imageId
        },
        title: {
            type: GraphQLString,
            resolve: (post) => post.title
        },
        owner: {
            type: UserType,
            resolve: (post) => mongo.getUserNameById(post.owner)
        },
        voteup: {
            type: GraphQLInt,
            resolve: (post) => post.voteup
        },
        votedown: {
            type: GraphQLInt,
            resolve: (post) => post.votedown
        },
        view: {
            type: GraphQLInt,
            resolve: (post) => post.view
        },
        date: {
            type: GraphQLString,
            resolve: (post) => post.date
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve: (post) => mongo.getTags(post.tags)
        }
    })
});

export const PostInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        imageId: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tags: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        }
    })
});

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (user) => user._id
        },
        username: {
            type: GraphQLString,
            resolve: (user) => user.username
        }
    })
})

export const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'A comment by a user on a post',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (comment) => comment._id
        },
        userId: {
            type: GraphQLString,
            resolve: (comment) => comment.userId
        },
        postId: {
            type: GraphQLString,
            resolve: (comment) => comment.postId
        },
        comment: {
            type: GraphQLString,
            resolve: (comment) => comment.comment
        },
        voteup: {
            type: GraphQLInt,
            resolve: (comment) => comment.voteup
        },
        votedown: {
            type: GraphQLInt,
            resolve: (comment) => comment.votedown
        },
        date: {
            type: GraphQLString,
            resolve: (comment) => comment.date
        }
    })
})

export const CommentInputType = new GraphQLInputObjectType({
    name: 'CommentInput',
    description: "Comment input type",
    fields: () => ({
        postId: {
            type: GraphQLString
        },
        comment: {
            type: GraphQLString
        }
    })
})
