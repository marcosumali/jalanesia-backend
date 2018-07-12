const express = require('express')
const trips = express.Router()
const { 
  findAll, 
  findOne, 
  findBySupplier,
  addTrip,
  deleteTrip,
  getPromotedTrips,
  getDivingTrips,
  getPartyTrips,
  getHopingTrips,
  getFilteredTrips
} = require('../controllers/trip.controller')

trips
  .get('/', findAll)
  // .get('/:id', findOne)
  .get('/promoted', getPromotedTrips)
  .get('/diving', getDivingTrips)
  .get('/party', getPartyTrips)
  .get('/islandhoping', getHopingTrips)
  .get('/filter', getFilteredTrips)
  .get('/by/:supplierName', findBySupplier)
  .post('/by/:supplierName', addTrip)
  .delete('/:id', deleteTrip)

module.exports = trips