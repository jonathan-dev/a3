import mongoose from 'mongoose' // connection to the mongodb
import casual from 'casual' // creating mock data

import User from './user'
import Post from './post'
import Tag from './tag'
import Comment from './comment'

// location of the mongodb
const MONGO = 'mongodb://localhost/a3'
mongoose.Promise = Promise
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
        //Check if user is banned
        // if (!isUserBanned(userId)) {
        return new Comment({
            comment: comment,
            postId: postId,
            userId: userId
        }).save();
        // } else {
        // console.log("User was banned, can't post comment", userId);
        //TODO - add proper error handling here to give better feedback to user
        // }
    },
    getUsers() {
        return User.find();
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
    },
    vote(voteInput, user) {
        // if (user.id) {
        const userId = '59dc5cef9291a622b964a3bb';
        const {
            action,
            postId
        } = voteInput;

        console.log(userId, postId)

        switch (action) {
            case "up":
                User.findOneAndUpdate({
                        _id: userId,
                        up: {
                            $nin: [postId]
                        }
                    }, {
                        $pull: {
                            down: postId
                        },
                        $push: {
                            up: postId
                        }
                    })
                    .then(u =>
                        Post.findOneAndUpdate({
                            _id: postId,
                            up: {
                                $nin: [userId]
                            }
                        }, {
                            $pull: {
                                down: userId
                            },
                            $push: {
                                up: userId
                            }
                        })
                    )
                break;

            case "down":
                return User.findOneAndUpdate({
                        _id: userId,
                        down: {
                            $nin: [postId]
                        }
                    }, {
                        $pull: {
                            up: postId
                        },
                        $push: {
                            down: postId
                        }
                    })
                    .then(u =>
                        Post.findOneAndUpdate({
                            _id: postId,
                            down: {
                                $nin: [userId]
                            }
                        }, {
                            $pull: {
                                up: userId
                            },
                            $push: {
                                down: userId
                            }
                        })
                    )
                break;

            case "neutral":
                return User.findOneAndUpdate({
                        _id: userId,
                    }, {
                        $pull: {
                            up: postId,
                            down: postId
                        }
                    })
                    .then(u =>
                        Post.findOneAndUpdate({
                            _id: postId,
                        }, {
                            $pull: {
                                up: userId,
                                down: userId
                            },
                        })
                    )
                break;

            default:
                throw new Error('invalid argument on vote input')
                break;
        }


        // } else {
        //     console.error('no auth')
        //     throw new Error('you need to be authorized to vote on a post')
        // }
    }
}
