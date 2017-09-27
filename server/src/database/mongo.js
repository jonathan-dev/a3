import mongoose from 'mongoose' // connection to the mongodb
import casual from 'casual' // creating mock data
import bluebird from 'bluebird'

import User from './user'
import Post from './post'
import Tag from './tag'
import Comment from './comment'

// location of the mongodb
const MONGO = 'mongodb://localhost/a3'
mongoose.Promise = bluebird
mongoose.connect(MONGO, {
    useMongoClient: true // needed to get rid of a error message
})

//Open connection to mongodb
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    // we're connected!
    console.log(`connected to mongodb at: ${MONGO}`)
})

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
    getPostsByOwner(ownerId) {
        return Post.find({owner: ownerId})
    },
    deletePost(id) {
        return Post.findByIdAndRemove(id)
    },
    getTag(id) {
        return Tag.findById(id)
    },
    getTagByName(name) {
        return Tag.findOne({
            name: name
        })
    },
    getTags(ids) {
        return Tag.find({
            _id: {
                "$in": ids
            }
        })
    },
    createTag(name) {
        return new Tag({
            name: name
        }).save()
    },
    createPost(postInput) {
        return new Post(postInput).save()
    },
    updatePost(postInput) {
        console.log("update post1: ", postInput)
        if (postInput.id && postInput.title && postInput.imageId) {
            console.log("update post2: ", postInput)
            postInput.tags = postInput.tags.map(x => x.id)
            return Post.findByIdAndUpdate(postInput.id, postInput)
        }
    },
    getComment(id) {
        return Comment.findById(id);
    },
    getCommentsPost(postIdArg) {
        return Comment.find({
            postId: postIdArg
        })
    },
    getCommentsUser(userIdArg) {
        return Comment.find({
            userId: userIdArg
        })
    },
    createComment(userId, postId, comment) {
        console.log("Creating comment: ");
        console.log("    userId: ", userId);
        console.log("    postId: ", userId);
        console.log("   comment: ", comment);
        //Validation
        return new Comment({
            comment: comment,
            postId: postId,
            userId: userId
        }).save();
    },
    getAuthenticated(name, password) {
        return User.getAuthenticated(name, password)
    },
    createUser(username, email, password) {
        return new User({
            username: username,
            email: email,
            password: password
        }).save()
    },
    getUserById(id) {
        return User.findById(id)
    },
    getUserNameById(id) {
        return User.findById(id,{username:1})
    }
}
