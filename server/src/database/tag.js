import mongoose from 'mongoose'

let tagSchema = mongoose.Schema({
  name: String
})

export default mongoose.model('Tag', tagSchema);
