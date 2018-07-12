const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  location: {
    city: {
      type: String ,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    latitude: Number,
    longitude: Number,
  },
  quota: {
    type: Number,
    required: true
  },
  difficulty: String,
  description: {
    highlight: {
      type: String,
      required: true
    },
    inclusive: String,
    excludes: String,
    itinerary: String,
    notes: String,
    terms: String
  },
  category: {
    type: String,
    required: true
  },
  promoteStatus: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)