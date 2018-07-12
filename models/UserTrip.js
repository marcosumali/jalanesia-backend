const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTripSchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('UserTrip', userTripSchema)