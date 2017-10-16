/**
 * Provides a Mongoose schema data model
 * for storing/retrieving posts in MongoDB
 */
import mongoose from 'mongoose'

let postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'unknown'
    },
    imageId: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        default: 0
    },
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: String,
        required: true
    },
    up: {
        type: [String]
    },
    down: {
        type: [String]
    }
});

export default mongoose.model('Post', postSchema);
