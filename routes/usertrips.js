const express = require('express')
const {
  findAll, 
  findOne, 
  add,
  deletion,
  findByUser
} = require('../controllers/userTrip.controller')
const { authentication, authorisation } = require('../middlewares/user.auth')

const userTrips = express.Router()

userTrips
  .get('/', findAll)
  .get('/by', findOne)
  .get('/byUser', authentication, authorisation, findByUser)
  .post('/', add)
  .delete('/delete', deletion)


module.exports = userTrips