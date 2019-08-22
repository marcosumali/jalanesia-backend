const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
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
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  quota: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
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