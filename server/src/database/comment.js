/**
 * Provides a Mongoose schema data model
 * for storing/retrieving comments in MongoDB
 */
import mongoose from 'mongoose'

let commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Comment', commentSchema);
