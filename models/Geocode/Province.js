const mongoose = require('mongoose')
const Schema = mongoose.Schema

const provinceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  geographicalUnit: {
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

module.exports = mongoose.model('Province', provinceSchema)