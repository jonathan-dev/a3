import mongoose from 'mongoose' // connection to the mongodb
import casual from 'casual' // creating mock data

import User from './user'
import Post from './post'
import Tag from './tag'
import Comment from './comment'

// location of the mongodb
const MONGO = 'mongodb://localhost/a3';
mongoose.Promise = Promise;
mongoose.connect(MONGO, {
    useMongoClient: true // needed to get rid of a error message
});

//Open connection to mongodb
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    // we're connected!
    console.log(`connected to mongodb at: ${MONGO}`)
});

// exporting functionality
export default {
    getPost(id) {
        return Post.findById(id)
    },
    getPosts(page) {
        return Post.find()
    },
    getPostsByOwner(ownerId) {
        return Post.find({
            owner: ownerId
        })
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
        if (ids) {
            return Tag.find({
                _id: {
                    "$in": ids
                }
            })
        }
        return Tag.find({})
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
        if (postInput.id && postInput.title && postInput.imageId) {
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
        //Validation
        //Check if user is banned
        // if (!isUserBanned(userId)) {
        return new Comment({
            comment: comment,
            postId: postId,
            userId: userId
        }).save();
    },
    updateComment(comment, userId) {
        return Comment.findOneAndUpdate({
            _id: comment.commentId,
            userId: userId
        }, {
            comment: comment.comment
        })
    },
    deleteComment(id) {
        return Comment.findByIdAndRemove(id);
    },
    getUsers() {
        return User.find();
    },
    isUsernameAvailable(username) {
        return User.find({username: username})
    },
    isEmailAvailable(email) {
        return User.find({email:email})
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
        return User.findById(id, {
            username: 1
        })
    },
    banUser(id) {
        return User.banUser(id);
    },
    unbanUser(id) {
        return User.unbanUser(id);
    },
    promoteUser(id) {
        return User.promoteUser(id);
    },
    setResetToken(email, resetPasswordToken, resetPasswordExpires) {
        return User.findOneAndUpdate({
            email: email
        }, {
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpires: resetPasswordExpires
        })
    },
    isValidResetToken(token) {
        return User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, {
            resetPasswordExpires: 1,
            username: 1
        });
    },
    resetPassword(token, password) {
        return new Promise((resolve, reject) => {
            User.findOne({
                    resetPasswordToken: token,
                    resetPasswordExpires: {
                        $gt: Date.now()
                    }
                })
                .then(user => {
                    if (user) {
                        user.password = password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.save()
                            .then(user => resolve(user)) //TODO: not return all user info
                            .catch(err => reject(err))
                    }
                })
                .catch(err => reject(err))
        })
    }
}
