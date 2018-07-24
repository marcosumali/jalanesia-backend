const express = require('express')
const carttrips = express.Router()

const {
  authentication, 
  authorisation, 
} = require('../middlewares/user.auth')

const {
  getCart, 
  autherror 
} = require('../middlewares/cart.auth')

const { 
  findAll, 
  findOne, 
  add,
  deletion,
  findByUser
} = require('../controllers/cartTrip.controller')

carttrips
  .get('/', findAll)
  .get('/byUser', authentication, authorisation, getCart, autherror, findByUser)
  .post('/', authentication, authorisation, getCart, autherror, add)
  .delete('/', authentication, authorisation, getCart, autherror, deletion)

  
module.exports = carttrips