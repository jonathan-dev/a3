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

const CommentType = new GraphQLObjectType({
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
    },
  })
})

var CommentInputType = new GraphQLInputObjectType({
  name: 'CommentAttributes',
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

//Defines all queries that can be done, and their details
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Perform a query on the database using one of the following:',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: (x, args) => {
        return mongo.getPosts()
          .then(x => x);
      }
    },
    post: {
      type: PostType,
      description: 'Get a specific post. Pass in post id as an argument.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, args) => {
        return mongo.getPost(args.id);
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      description: 'Get a list of all tags that have been used',
      resolve: (x, args) => {
        return mongo.getTags()
          .then(x => x);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      description: 'Get a list of comments for a specific post',
      args: {
        postId: { type: GraphQLString },
        userId: { type: GraphQLString }
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
    //Creates a new post
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
    createComment: {
      type: CommentType,
      description: "Create a new comment on a post",
      args: {
        comment: {
          type: CommentInputType
        }
      },
      resolve: (root, {comment}, context) => {
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
    //Updates post with details
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
    //Deletes a given post
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
