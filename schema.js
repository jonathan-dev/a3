import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';
import mongo from './mongo'

const TagType = new GraphQLObjectType({
    name: 'Tag',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (tag) => tag.name
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: '...',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (post) => post.title
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
            resolve: (post) => post.tags.map(tagId =>
                mongo.getTag(tagId).then(tag => tag)
            )
        }

    })
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        posts: {
            type: new GraphQLList(PostType),
            resolve: (x, args) => {
                console.log("args: ", args)
                return mongo.getPosts()
                    .then(x => x)
            }
        },
        deletePost: {
            type: PostType,
            description: 'Delete an article with id and return the article that was deleted.',
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
})

export default new GraphQLSchema({
    query: QueryType,
})