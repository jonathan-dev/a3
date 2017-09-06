import mongoose from 'mongoose' // connection to the mongodb
import casual from 'casual' // creating mock data
import bluebird from 'bluebird'
import bcrypt from 'bcryptjs'
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
let userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number }
})
const LOCK_TIME = 2 * 60 * 60 * 1000;

userSchema.virtual('isLocked').get(
  // check for a future lockUntil timestamp
  () => !!(this.lockUntil && this.lockUntil > Date.now())
);

userSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10)
  .then(salt => {
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt)
    .then(hash => {
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    })
    .catch(err => next(err))
  })
  .catch(err => next(err))
});

userSchema.methods.comparePassword = (candidatePassword) => {
  return new Promise((resolve, reject) => {
  bcrypt.compare(candidatePassword, this.password)
  .then(isMatch => resolve(isMatch))
  .catch(err => reject(err))
  })
};

userSchema.methods.incLoginAttempts = () => {
  return new Promise((resolve, reject) => {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
      this.update({
          $set: { loginAttempts: 1 },
          $unset: { lockUntil: 1 }
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    this.update(updates)
    .then(res => resolve(res))
    .catch(err => reject(err))
  })

};


userSchema.statics.getAuthenticated = (username, password) => {
  return new Promise((resolve, reject) => {
    this.findOne({ username: username })
    .then(user => {
      // make sure the user exists
      if (!user) resolve(null,reasons.NOT_FOUND)

      // check if the account is currently locked
      if (user.isLocked) {
          // just increment login attempts if account is already locked
          user.incLoginAttempts()
          .then(()=>resolve(null, reasons.MAX_ATTEMPTS))
          .catch(err => reject(err))
      }

      // test for a matching password
      user.comparePassword(password)
      .then(isMatch => {
        // check if the password was a match
        if (isMatch) {
          // if there's no lock or failed attempts, just return the user
          if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
          // reset attempts and lock info
          var updates = {
              $set: { loginAttempts: 0 },
              $unset: { lockUntil: 1 }
          };
          user.update(updates)
          .then(()=> resolve(user))
          .catch(err => resolve(err))
        }

        // password is incorrect, so increment login attempts before responding
        user.incLoginAttempts()
        .then(()=>resolve(null, reasons.PASSWORD_INCORRECT))
        .catch(err => resolve(err))
      })
      .catch(err => resolve(err))
    })
    .catch(err => resolve(err))
  })
}



let Post = mongoose.model('Post', postSchema)
let Tag = mongoose.model('Tag', tagSchema)
let User = mongoose.model('User', userSchema)



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
  getUser(name){
    return User.findOne({name: name})
  },
  createUser(username, password){
    return new User({
      username: username,
      password: password
    }).save()
  }
}
