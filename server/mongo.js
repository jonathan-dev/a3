import mongoose from 'mongoose' // connection to the mongodb
import casual from 'casual' // creating mock data
import bluebird from 'bluebird'

import User from './user'

// location of the mongodb
const MONGO = 'mongodb://localhost/a3'
mongoose.Promise = bluebird
mongoose.connect(MONGO, {
  useMongoClient: true // needed to get rid of a error message
})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log(`connected to mongodb at: ${MONGO}`)
})

let postSchema = mongoose.Schema({
  title: String,
  imageId: String,
  voteup: Number,
  votedown: Number,
  view: Number,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  }
})
let tagSchema = mongoose.Schema({
  name: String
})



let Post = mongoose.model('Post', postSchema)
let Tag = mongoose.model('Tag', tagSchema)



// This method initializes the database if it is empty
async function initDatabase() {
  //insert tags
  const tags = await Tag.find()
  if (tags.length === 0) {
    let ps = []
    for (var i = 0; i < 10; i++) {
      let p = await new Tag({
        name: casual.word
      }).save()
      ps.push(p)
    }
    await Promise.all(ps)
  }
  // insert posts
  const posts = await Post.find()
  if (posts.length === 0) {
    casual.seed(123)
    const tagdata = await Tag.find()
    let ps = []
    for (let i = 0; i < 10; i++) {
      let randarr = Array.apply(null, {
          length: casual.integer(1, 5)
        })
        .map(() => {
          return tagdata[casual.integer(1, 9)]._id
        })
      let p = await new Post({
        title: casual.title,
        voteup: casual.integer(0, 100),
        votedown: casual.integer(0, 100),
        view: casual.integer(0, 100),
        tags: randarr
      }).save()
      ps.push(p)
    }
    await Promise.all(ps)
  }

  // User.remove({})
  // .then(() => {
  //   // create a user a new user
  // var testUser = new User({
  //   username: 'jo',
  //   password: 'Password123'
  // });

  // // save user to database
  // testUser.save()
  // .catch(err=>console.log(err))
  // .then(async()=> {
  //   // // attempt to authenticate user
  //   // User.getAuthenticated('jmar777', 'Password123')
  //   // .then(data => {
  //   //   let user = data.user
  //   //   let reason = data.reason
  //   //   // login was successful if we have a user
  //   //   if (user) {
  //   //       // handle login success
  //   //       console.log('login success');
  //   //       return;
  //   //   }

  //   //   // otherwise we can determine why we failed
  //   //   var reasons = User.failedLogin;
  //   //   switch (reason) {
  //   //       case reasons.NOT_FOUND:
  //   //       case reasons.PASSWORD_INCORRECT:
  //   //           // note: these cases are usually treated the same - don't tell
  //   //           // the user *why* the login failed, only that it did
  //   //           break;
  //   //       case reasons.MAX_ATTEMPTS:
  //   //           // send email or otherwise notify user that account is
  //   //           // temporarily locked
  //   //           break;
  //   //   }
  // // })
  // // .catch(err => console.log(err))

  //   // await User.getAuthenticated('jmar777', 'Password123')
  //   // await User.getAuthenticated('jmar777', 'Password123')
  //   // await User.getAuthenticated('jmar777', 'Password123')
  //   // await User.getAuthenticated('jmar777', 'Password1234')
  //   // await User.getAuthenticated('jmar777', 'Password1234')
  //   // await User.getAuthenticated('jmar777', 'Password1234')
  //   // await User.getAuthenticated('jmar777', 'Password1234')
  //   // await User.getAuthenticated('jmar777', 'Password1234')


  // })
  // .catch(err => console.log(err))
  // })
}
initDatabase()


// exporting functionality
export default {
  getPost(id) {
    return Post.findById(id)
  },
  getPosts(page) {
    return Post.find()
  },
  deletePost(id) {
    return Post.findByIdAndRemove(id)
  },
  getTag(id) {
    return Tag.findById(id)
  },
  getTagByName(name) {
    return Tag.findOne({name:name})
  },
  getTags(page) {
    return Tag.find()
  },
  createTag(name){
    return new Tag({
      name: name
    }).save()
  },
  createPost(postInput) {
    if (postInput.title && postInput.imageId) {
      postInput.date = new Date();
      postInput.voteup = 0;
      postInput.vote = 0;
      console.log('postinput', postInput);

      return new Post({
        title: postInput.title,
        imageId: postInput.imageId,
        voteup: 0,
        votedown: 0,
        view: 0,
        tags: postInput.tags
      }).save()
    }
  },
  updatePost(postInput) {
    console.log("update post1: ", postInput)
    if(postInput.id && postInput.title && postInput.imageId) {
      console.log("update post2: ", postInput)
      postInput.tags = postInput.tags.map(x => x.id)
      return Post.findByIdAndUpdate(postInput.id,postInput)
    }
  },
  getAuthenticated(name, password){
    return User.getAuthenticated(name, password)
  },
  createUser(username, password){
    return new User({
      username: username,
      password: password
    }).save()
  },
  getUserById(id) {
    return User.findById(id)
  }
}
