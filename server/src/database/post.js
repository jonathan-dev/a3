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
    voteup: {
        type: Number,
        default: 0
    },
    votedown: {
        type: Number,
        default: 0
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
    }
});

export default mongoose.model('Post', postSchema);
