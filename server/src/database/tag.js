/**
 * Provides a Mongoose schema data model
 * for storing/retrieving tags in MongoDB
 */
import mongoose from 'mongoose'

let tagSchema = mongoose.Schema({
    name: String
})

export default mongoose.model('Tag', tagSchema);
