const express = require('express')
const carttrips = express.Router()

const {
  authentication, 
  authorisation, 
} = require('../middlewares/user.auth')

const {
  getCart,
  checkCart
} = require('../middlewares/cart.auth')

const { 
  getRemainingQuota,
  checkQuotaTrip,
  autherror
} = require('../middlewares/trip.auth')

const { 
  findAll, 
  findOne, 
  add,
  deletion,
  findByUser,
  updateQty
} = require('../controllers/cartTrip.controller')

carttrips
  .get('/', findAll)
  .get('/byUser', authentication, authorisation, getCart, autherror, findByUser)
  .post('/', authentication, authorisation, getCart, checkCart, getRemainingQuota, checkQuotaTrip, autherror, add)
  .put('/', authentication, authorisation, getCart, checkCart, getRemainingQuota, checkQuotaTrip, autherror, updateQty)
  .delete('/', authentication, authorisation, getCart, checkCart, autherror, deletion)

  
module.exports = carttrips