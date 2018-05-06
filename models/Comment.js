const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true
  },
  body: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)