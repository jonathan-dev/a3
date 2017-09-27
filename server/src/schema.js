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
import actions from './actions'

const TagType = new GraphQLObjectType({
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

var TagAttributesInputType = new GraphQLInputObjectType({
  name: 'TagAttributes',
  fields: () => ({
    id: {
      type: GraphQLString
    }
  })
})

const PostType = new GraphQLObjectType({
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
});

var PostInputType = new GraphQLInputObjectType({
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

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Perform a query on the database using one of the following:',

  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: (x, args) => {
        return mongo.getPosts()
          .then(x => x)
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      description: 'Get a list of all tags that have been used',
      resolve: (x, args) => {
        return mongo.getTags()
          .then(x => x)
      }
    }
  })
});

const PostMutation = new GraphQLObjectType({
  name: 'PostMutations',
  description: 'Post API Mutations',
  fields: () => ({
    createPost: {
      type: PostType,
      description: 'Create a new post.',
      args: {
        post: {
          type: PostInputType
        }
      },
      resolve: (root, {
        post
      }, context) => {
        //iterate over the tags array and find corresponding ids or create new tag
        if(context.req.user){
          let userId = context.req.user._id
          return actions.createPost(userId,post)
        }else {
          console.error('no auth')
          throw new Error('you need to be authorized to create a post')
        }
      }
    },
    updatePost: {
      type: PostType,
      description: 'Update an post, and optionally any related posts.',
      args: {
        post: {
          type: PostInputType
        }
      },
      resolve: (root, {
        post
      }) => {
        console.log('resolve: ', post)
        return mongo.updatePost(post).then(x => x)
      }
    },
    deletePost: {
      type: PostType,
      description: 'Delete an post with id and return the post that was deleted.',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (value, {
        id
      }) => {
        return mongo.deletePost(id)
      }
    }
  })
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: PostMutation
})
