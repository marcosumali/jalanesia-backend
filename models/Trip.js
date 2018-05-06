const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  name: String,
  startDate: Date,
  endDate: Date,
  price: Number,
  location: {
    city: String,
    country: String,
    latitude: Number,
    longitude: Number,
  },
  quota: Number,
  difficulty: String,
  description: {
    highlight: String,
    inclusive: String,
    excludes: String,
    itinerary: String,
    notes: String,
    terms: String
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)