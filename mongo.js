import mongoose from 'mongoose' // connection to the mongodb
import casual from 'casual'; // creating mock data

// location of the mongodb
const MONGO = 'mongodb://localhost/a3'

mongoose.connect(MONGO, {
  useMongoClient: true // needed to get rid of a error message
})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log(`connected to mongodb at: ${MONGO}`)
});

let postSchema = mongoose.Schema({
  title: String,
  voteup: Number,
  votedown: Number,
  view: Number,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  }
});
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
    casual.seed(123);
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
  }
};