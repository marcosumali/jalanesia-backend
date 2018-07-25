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
  getFilteredTrips,
  getTripsByCategory,
  promoteTrip,
  updateTrip
} = require('../controllers/trip.controller')

trips
  .get('/', findAll)
  .get('/byId', findOne)
  .get('/bySupplier', findBySupplier)
  .get('/category', getTripsByCategory)
  .get('/promoted', getPromotedTrips)
  .get('/diving', getDivingTrips)
  .get('/party', getPartyTrips)
  .get('/islandhoping', getHopingTrips)
  .get('/filter', getFilteredTrips)
  .post('/', addTrip)
  .put('/', updateTrip)
  .put('/promote', promoteTrip)
  .delete('/', deleteTrip)

module.exports = trips