import mongoose from 'mongoose'

let commentSchema = mongoose.Schema({
  comment: String,
  userId: String,
  postId: String,
  voteup: Number,
  votedown: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', commentSchema);
