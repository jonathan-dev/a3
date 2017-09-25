import mongoose from 'mongoose'

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
});

export default mongoose.model('Post', postSchema);
