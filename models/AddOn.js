const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addonSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
  },
  name: String,
  type: String,
  description: String,
  days: Number,
  price: Number
})

module.exports = mongoose.model('AddOn', addonSchema)
