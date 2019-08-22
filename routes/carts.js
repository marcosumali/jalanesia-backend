const express = require('express')
const carts = express.Router()

const { authentication, authorisation } = require('../middlewares/user.auth')

const { 
  findAll, 
  findOne, 
  add,
  deletion,
  findByUser
} = require('../controllers/cart.controller')

carts
  .get('/', findAll)
  .get('/byUser', authentication, authorisation, findByUser)
  .post('/', authentication, authorisation, add)
  .delete('/', authentication, authorisation, deletion)

module.exports = carts