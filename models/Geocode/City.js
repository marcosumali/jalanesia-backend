const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  island: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('City', citySchema)