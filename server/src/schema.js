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

var PostAttributesInputType = new GraphQLInputObjectType({
  name: 'PostAttributes',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    votedown: {
      type: GraphQLInt
    },
    voteup: {
      type: GraphQLInt
    },
    view: {
      type: GraphQLInt
    },
    tags: {
      type: new GraphQLList(TagAttributesInputType)
    },
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
      }) => {
        //iterate over the tags array and find corresponding ids or create new tag
        console.log(post);
        let querytags = post.tags;
        post.tags=[];
        let promiseArray = []
        querytags.forEach(tag =>{
          console.log(tag)
          promiseArray.push(
            new Promise ((resolve, reject) => {
              mongo.getTagByName(tag)
              .then(t => {
                if(t) {
                  console.log('found tag',t)
                  post.tags.push(t._id);
                  resolve();
                }else {
                  console.log('create', tag);
                  mongo.createTag(tag)
                  .then(t => {
                    console.log('created',t)
                    post.tags.push(t._id)
                    resolve()
                  })
                  .catch(e => reject(e))
                }
                })
              .catch( e=> reject(e))
            })
          )
        });
        Promise.all(promiseArray).then(e =>{
          return mongo.createPost(post).then(x => x)
        })
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
    }
  })
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: PostMutation
})
