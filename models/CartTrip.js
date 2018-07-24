const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartTripSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: [true, 'cartId is required'],
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    trim: true,
    unique: true,
    required: [true, 'tripId is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    min: 1,
  }
}, {
  timestamps: true
})


module.exports = mongoose.model('CartTrip', cartTripSchema)