const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    unique: true,
    required: 'userId is required',
  }
}, {
  timestamps: true
})


module.exports = mongoose.model('Cart', cartSchema)