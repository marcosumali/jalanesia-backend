const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTripSchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    trim: true,
    required: [true, 'tripId is required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    min: 1,
  },
  status: {
    type: String,
    required: [true, 'status is required'],
  },
  sentiment: String,
  score: {
    type: Number,
    min: 0,
  },
  review: String
}, {
  timestamps: true
})

module.exports = mongoose.model('UserTrip', userTripSchema)