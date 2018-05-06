const express = require('express')
const trip = express.Router()
const { 
  findAll, 
  findOne, 
  findBySupplier,
  addTrip,
  deleteTrip 
} = require('../controllers/trip.controller')

trip
  .get('/', findAll)
  .get('/:id', findOne)
  .get('/by/:supplierName', findBySupplier)
  .post('/by/:supplierName', addTrip)
  .delete('/:id', deleteTrip)

module.exports = trip